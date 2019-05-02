//Dependencies
//==========================================
require("dotenv").config();
var express = require("express");
var routes =require("./routes");
var app = express();


var PORT = process.env.PORT || 3000;

var http = require("http").Server(app);
// var io = require("socket.io")(http);

// Middleware
//==========================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(routes);

app.get('/', function(req, res) {
    
    res.sendfile('index.html');
});

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// io.on('connection', function(socket) {
//   console.log('A user connected');

//   socket.on('disconnect', function () {
//      console.log('A user disconnected');
//   });
// });

//MONGOOSE DATABASE
//==================================
mongoose.connect(
    process.env.MOONGODB_URI || "mongodb://localhost/lifegame",
    {
        useCreateIndex:true,
        useNewUrlParser: true,
    }
)

//START THE SERVER
//=================================
http.listen(PORT, function() {
  console.log('listening on localhost:', PORT);
});