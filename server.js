require("dotenv").config();
var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

var http = require("http").Server(app);
var io = require("socket.io")(http);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));

//Will we need this when we deploy - if in this is where to serve files from
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

//If running a test, set syncOptions.force to true
//clearing the 'testdb'
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};

io.on('connection', function (socket) {
  console.log('A user connected');

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

http.listen(PORT, function () {
  console.log('listening on localhost:', PORT);
});