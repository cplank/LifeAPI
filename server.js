var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
app.get('/', function(req, res) {
   res.send("What up?");
});

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A client connected');

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A client disconnected');
   });
});

http.listen(PORT, function() {
   console.log('listening on *:', PORT);
});