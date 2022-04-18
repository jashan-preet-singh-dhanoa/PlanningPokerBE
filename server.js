const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

const PORT = 4047;

app.use(cors({origin:'http://localhost:3000'}));
app.get('/',(req,res)=>res.send('hello'))
const server = app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
});

const io = socket(server,{
    cors:{origin:'*'}
});


io.on('connection',(socket)=>{
    console.log(`connection established on ${socket.id}`);

    socket.on('game_name',(data)=>{
        console.log(data, 'game name')
        socket.join(data);
    });
    socket.on('add_user',(data)=>{
        console.log('add user', data);
        socket.to(data.game_name).emit('receive_user',data);
    });

    socket.on('user_disconnected',(data)=>{
        console.log('user disconnected ', data)
        socket.to(data.game_name).emit('game_over',data);
    })
});


