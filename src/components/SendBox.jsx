import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message";
import "./SendBox.css"

function SendBox({ setMessages }) {
    const [text, setText] = useState("");

    function addToMessages() {
        if (text.trim() !== "") {
            setMessages(prevMessages => [...prevMessages, text]);
            setText("");
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