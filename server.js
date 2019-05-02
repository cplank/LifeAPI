//Dependencies
//==========================================
// require("dotenv").config();
var express = require("express");
var routes = require("./routes");
var app = express();
const db = require("./models");
const mongoose = require("mongoose");

var PORT = process.env.PORT || 3001;

var http = require("http").Server(app);
// var io = require("socket.io")(http);

// Middleware
//==========================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(routes);

//Will we need this when we deploy - if in this is where to serve files from
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

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
    process.env.MOONGODB_URI || "mongodb://username:password54321@ds151066.mlab.com:51066/heroku_5zfb8klb",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
    }
)

//START THE SERVER
//=================================
http.listen(PORT, function () {
    console.log('listening on localhost:', PORT);
});