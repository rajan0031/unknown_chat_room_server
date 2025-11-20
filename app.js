// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const path = require('path');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);

// // Allow requests from Angular (http://localhost:4200)
// app.use(cors({
//   origin: 'http://localhost:4200',
//   methods: ['GET', 'POST','DELETE','PUT'],
//   credentials: true
// }));

// // Attach Socket.IO with CORS config
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:4200',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });

// // Set EJS as the view engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Route to render EJS template
// app.get('/', (req, res) => {
//   res.render('index'); // looks for views/index.ejs
// });

// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.emit('hello', 'Hello World from Socket.IO + EJS');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });




// app2 


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow Angular client (http://localhost:4200)
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Attach Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Message:', msg);
    // Broadcast to all clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
