import React, { useState, useEffect } from "react";
import SendBox from "./components/SendBox";
import Message from "./components/Message";
import { TextField } from "@mui/material";
import "./App.css";
import { socket } from "./socket";

export let username = window.prompt("Enter your username: ");
if (username === null) {
  username = "Unnamed User";
}

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const msgsContainer = document.getElementById("green");
    msgsContainer.scrollTop = msgsContainer.scrollHeight;
  }, [messages]);

  socket.on("serverMessagesUpdate", (messages) => {
    setMessages(messages);
  });
  return (
    <div id="red" className="flex w-full h-full flex-col">
      <div
        id="green"
        className="flex flex-grow w-full max-h-screen overflow-auto"
      >
        <div id="purple" className="flex flex-col w-full">
          {messages.map((messageInfo, index) => (
            <Message key={index} messageInfo={messageInfo} />
          ))}
        </div>
      </div>
      <div id="blue" className="flex w-full">
        <SendBox setMessages={setMessages} />
      </div>
    </div>
  );
}

export default App;
