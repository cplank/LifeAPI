const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

let databaseURL = "LifeGames";
let collections = ["Users", "Games"];

mongoose.connect(
    process.env.MONGODB_URI || "",//for localhost, need to put the MongoDB here
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }
);

app.listen(PORT, () =>
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);