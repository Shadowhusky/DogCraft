var express=require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var onlineUsers=0;

function saveChatHistory(data)
{
	var fs = require('fs');
	var time = new Date().toLocaleString();
	fs.appendFile(__dirname +'/chatHistory.txt', time + " : "+ data+'\r\n', function (err) {
    if (err) 
    {
      console.log(err);
    }
});	
}


app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  onlineUsers++;
  console.log('Online users:'+onlineUsers);
   socket.on('disconnect', function(){
	onlineUsers--;
    console.log('Online users:'+onlineUsers);
  });
  socket.on('message_client_public', function(msg){
    console.log('message from client: ' + msg);
	saveChatHistory(msg);
	io.emit('chat_public',msg);
  });
});
    

http.listen(80, function(){
  console.log('listening on *:80');
});
    