require("dotenv").config();
var express = require("express");

var app = express();
var PORT = process.env.PORT || 3001;

var http = require("http").Server(app);
var io = require("socket.io")(http);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send('What up');
});

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

io.on('connection', function (socket) {
  console.log('A user connected');

  // add the just connected client socket to a game "room"
  socket.join('game1');

  var gameSize = io.nsps['/'].adapter.rooms["game1"].length;
  console.log("num players in game1:", gameSize)

  // register that the socket has disconnected
  socket.on('disconnect', function () {

    console.log('A user disconnected');
    socket.leave("game1");

    // Check if game room stil exists. If so, log num players in it, if not then say it's empty
    var game = io.nsps['/'].adapter.rooms["game1"];
    game ?
      console.log("num players in game1:", game.length)
      : console.log("game1 is empty");
  });
});

http.listen(PORT, function () {
  console.log('listening on localhost:' + PORT);
});