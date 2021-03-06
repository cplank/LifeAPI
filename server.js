//Dependencies
//==========================================
// require("dotenv").config();
var express = require("express");
const cors = require("cors")
var routes = require("./routes");
var app = express();
const mongoose = require("mongoose");;
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./passport')

var PORT = process.env.PORT || 3001;

var http = require("http").Server(app);
var io = require("socket.io")(http);


//MONGOOSE DATABASE
//==================================
mongoose.connect(
    process.env.MOONGODB_URI || "mongodb://username:password54321@ds151066.mlab.com:51066/heroku_5zfb8klb",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
    }
)
// const cors = require("cors");

// Middleware
//==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //need this to be true for passport
app.use(express.static("public"));
app.use(morgan('dev'))

// ===== Passport ====
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); //will create a user obj in the req obj
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser


// const corsOptions = {
//     origin: "*",

// }
// app.options("*", cors(corsOptions));
app.use(cors());

app.use(routes);

//Will we need this when we deploy - if in this is where to serve files from
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"))
// }
let choices = [];
io.on('connection', function (socket) {
    console.log('A user connected');


    // trigger game start for all players in a game
    socket.on("startPlayers", function (game, gameObj) {
        console.log(`sending gameStart to ${game}`)
        console.log(gameObj)
        io.in(game).emit("gameStart", gameObj)
    })

    // Listener for player making a choice
    socket.on("choiceMade", (game) => {
        let thisGame = io.nsps['/'].adapter.rooms[game];
      
        // choices++;
        choices.forEach((e) => {
            console.log(`e.game: ${e.game}`)
            if (e.game === game) {
                e.numChoices++;
                console.log(e);
                console.log(`${socket.id} made a choice`);
                console.log(`choices made: ${e.numChoices}`);
                console.log("numPlayers:", thisGame.length - 1);

                if (e.numChoices === thisGame.length - 1) {
                    io.in(game).emit("showResult")
                    e.numChoices = 0;
                }
            }
        })

    })

    socket.on("gameNum", function (game) {

        console.log("socket wants to join game:", game);
        socket.join(game);

        let thisGame = io.nsps['/'].adapter.rooms[game];

        console.log("num players in", game + ":", thisGame.length)

        // If this is the first client to connect to this game, they're the host
        if (thisGame.length === 1) {
            console.log("sending host message");
            socket.emit("host", true);
            choices.push({ game: game, numChoices: 0 })
        }

        let numPlayers = thisGame.length - 1;
        // notify all sockets in this game of the total player count, minus host 
        socket.to(game).emit("playerCount", numPlayers)

        // register that the socket has disconnected
        socket.on('disconnect', function () {
            console.log('A user disconnected');

            choices.forEach((e, i) => {
                if (e.game === game) {
                    console.log(`choice.length: ${choices.length}`)
                    choices.splice(i, 1)
                    console.log(`choice.length after splice: ${choices.length}`)
                }
            })

            // ensure that the host knows the current player count
            socket.to(game).emit("playerCount", thisGame.length - 1)

            // Check if game room stil exists. If so, log num players in it, if not then say it's empty
            thisGame.length ?
                console.log("num players in game", game, ":", thisGame.length)
                : console.log(game, "is empty");
        });
    })
});

// If running a test, set syncOptions.force to true
// clearing the `testdb`

//START THE SERVER
//=================================
http.listen(PORT, function () {
    console.log('listening on localhost:', PORT);
})