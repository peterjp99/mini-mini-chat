var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames={};
var ms

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
});

io.on('connection', function(socket){

  socket.on('adduser', function(username){
	
		socket.username = username;
		ms=" is connected";
		io.emit('chat message',socket.username, ms)
		usernames[username] = username;
		 });
		 
  socket.on('chat message', function(msg){
    io.emit('chat message',socket.username, msg)
  });
  
 socket.on('disconnect', function(){
    ms = " is disconnected"
    io.emit('chat message',socket.username, ms)
  });


});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
    

