//Dependencies
//==========================================
// require("dotenv").config();
var express = require("express");
const cors = require("cors")
var routes = require("./routes");
var app = express();
const db = require("./models");
const mongoose = require("mongoose");

var PORT = process.env.PORT || 3001;

var http = require("http").Server(app);
var io = require("socket.io")(http);

// Middleware
//==========================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const corsOptions = {
    origin: "*",

}
app.options("*", cors(corsOptions));
app.use(routes);

//Will we need this when we deploy - if in this is where to serve files from
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"))
// }

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on("gameNum", function (game) {
        console.log("socket wants to join game:", game);
        socket.join(game);

        let gameSize = io.nsps['/'].adapter.rooms[game].length;

        console.log("num players in", game + ":", gameSize)
    })




    // add the just connected client socket to a game "room"
    // socket.join('game1');

    // var gameSize = io.nsps['/'].adapter.rooms["game1"].length;
    // console.log("num players in game1:", gameSize)

    // register that the socket has disconnected
    socket.on('disconnect', function () {

        console.log('A user disconnected');
        // socket.leave("game1");

        // Check if game room stil exists. If so, log num players in it, if not then say it's empty
        // var game = io.nsps['/'].adapter.rooms["game1"];
        // game ?
        //     console.log("num players in game1:", game.length)
        //     : console.log("game1 is empty");
    });
});

// If running a test, set syncOptions.force to true
// clearing the `testdb`


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
})