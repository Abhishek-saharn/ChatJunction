// var hello=require('./custom_hello');
// var byebye=require('./custom_bye');
//
// hello();
// byebye.by();
//const makeRequestInApp = require('./make_request');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

 app.get('/',function(req,res){
   res.sendFile(__dirname+'/index.html')
 });
 io.on('connection',function(socket){
   socket.on('join',function(nickname){
     socket.nickname=nickname;

     console.log(socket.nickname+' connected');
   });
   socket.emit('notification',{content:"All users are notified"});
   socket.on('chat message',function(msg){
      io.emit('chat message',socket.nickname+": "+ msg);
   });

   socket.on('disconnect',function(){
     console.log(socket.nickname+" disconnected");
   });
 });

http.listen(3000,function(){
  console.log("Server running on 3000");
});

// app.get('/',function(req,res){
//     res.sendfile(__dirname +  "/index.html");
// });
// app.listen(3000,function(){
//   console.log("server running");
// });
// makeRequestInApp("Looking ");
