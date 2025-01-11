// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');

// dotenv
dotenv.config();

// MongoDB
connectDB();

// Rest object
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
const io = socketIo(server);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', require('./routes/userRoutes'));
app.use('/api/v1/post', require('./routes/postRoutes'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('add-comment', (comment) => {
    io.emit('new-comment', comment);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Port
const PORT = process.env.PORT || 8080;

// Start server
server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgGreen.white);
});
