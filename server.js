const express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/public/board.html');
});

app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+'/public/admin.html');
});

io.on('connection',(socket)=>{
    console.log("connection established")

    socket.on('disconnect',()=>{
        console.log("client disconnected")
    })

    socket.on('message',(msgfromadmin)=>{
        console.log(msgfromadmin)
        io.emit("messageFromServerSendByAdmin",msgfromadmin);
    })
})

http.listen(3000,()=>{
    console.log("connected to server");
})