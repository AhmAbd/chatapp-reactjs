const express = require('express');
const path = require("path"); 
const SocketIoServer = require("socket.io").Server;

const app = express();


app.use(
    express.static(
        path.resolve(__dirname, "../dist")
    )
);

const server = app.listen(8080, () => {
    console.log("listening on port 8080. 🤓");
    
});

const io = new SocketIoServer(server);

const messages = [];


io.on("connection", (client) => { 
    console.log(`${client.id} has connected.`);

    client.on("clientSendMessage", (messageInfo) => {

        messages.push(messageInfo);
        io.emit("serverMessagesUpdate", messages);
    });
});