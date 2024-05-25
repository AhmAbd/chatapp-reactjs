const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// MongoDB connection URI
const uri = "mongodb+srv://mbabdullatif:ccATSfb9oam8QeU7@cluster0.9a2uu76.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB Atlas cluster
client.connect(err => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }
    console.log("Connected to MongoDB");
    const db = client.db("Cluster0");

    // Define routes for handling message-related operations

    // Create Message Endpoint
    app.post('/api/messages', async (req, res) => {
        try {
            const { text } = req.body;
            const result = await db.collection('messages').insertOne({ text });
            res.status(201).json({ message: "Message created successfully", messageId: result.insertedId });
            // Emit newMessage event to all connected clients
            io.emit('newMessage', { text });
        } catch (error) {
            console.error("Error creating message:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // Get Messages Endpoint
    app.get('/api/messages', async (req, res) => {
        try {
            const messages = await db.collection('messages').find({}).toArray();
            res.status(200).json(messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    // WebSocket connection event handler
    io.on('connection', socket => {
        console.log('A client connected');

        // Handle disconnect events
        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });

    // Start the server
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
