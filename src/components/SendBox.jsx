import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import "./SendBox.css"
import { username } from '../App';
import { socket } from "../socket";

function SendBox({ setMessages }) {
    const [text, setText] = useState("");

    function addToMessages() {
        if (text.trim() !== "") {
            const messageInfo = {
                name: username,
                message: text
            };
            setMessages(prevMessages => [...prevMessages, messageInfo]);
            setText("");
            socket.emit("clientSendMessage", messageInfo);
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addToMessages();
        }
    }

    return (
        <TextField
            fullWidth
            label="Enter a message"
            id="fullWidth"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
                style: { color: 'white' },
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={addToMessages}>
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
}

export default SendBox;