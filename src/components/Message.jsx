import { TextField } from "@mui/material";
import "./Message.css";

function Message(props) {
    return (
        <>
            <div id="msgdiv" className="flex w-full flex-col">
                <h1 id="username">{props.messageInfo.name}</h1>
                <TextField
                    id="outlined-read-only-input"
                    label=""
                    value={props.messageInfo.message}
                    InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                    }}
                    sx={{ backgroundColor: '#424549' }}
                />
            </div>
        </>
    );
}

export default Message;