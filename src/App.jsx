import React, { useState } from 'react';
import SendBox from './components/SendBox';
import Message from './components/Message';
import { TextField } from '@mui/material';
import "./App.css";

function App() {
    const [messages, setMessages] = useState([]);

    return (
        <div id='red' className="flex w-full h-full flex-col">
            <div id='green' className="flex flex-grow w-full max-h-screen overflow-auto">
                <div id='purple' className='flex flex-col w-full'>
                    {messages.map((message, index) => (
                        <Message key={index} value={message} />
                    ))}
                </div>  
            </div>
            <div id='blue' className="flex w-full">
                <SendBox setMessages={setMessages}/>
            </div>
        </div>
    );
}

export default App;