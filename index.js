// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// // listen for requests :)
// const listener = app.listen(3000, () => {
//   console.log("Your app is listening on port " + 3000);
// });

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 7000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

let counter;

// initialize socket.io
let io = require('socket.io')().listen(server);

io.sockets.on('connected',(socket)=> {
  console.log("We have a new client"+socket.id);

  socket.on('disconnect',function(){
    console.log("socket disconected"+socket.id);
    let disconnectUser ={
        "UserID" : socket.id
    }
    io.sockets.emit(disconnectUser);
})

//   socket.on('joined',()=>{
//     console.log("client require joined")
//     // counter++;
//     // let idIndex ={
//     //   "UserID":socket.id,
//     //   "UserJoined":counter
//     // }
//     // io.sockets.emit('joined',(idIndex));
//     // console.log(idIndex);
//   })


});