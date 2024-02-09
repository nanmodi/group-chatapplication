import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static( './dist'));

const corsOptions = {
  cors:true,
  
};
app.use(cors(corsOptions));

const users = {};

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', (socket) => {
  socket.on('join', (name) => {
    console.log(name);
    if(name==null)return;
    users[socket.id] = name;
    socket.emit('welcome',`WELCOME ${name} to the group chat`)
    socket.broadcast.emit('new-user joined', name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('recieve', { message: message, user_name: users[socket.id] });
  });
  socket.on('disconnect',()=>{
    socket.broadcast.emit('leave',users[socket.id])
    })
  });

server.listen(9000, () => {
  console.log('Server is running on port 9000');
});
