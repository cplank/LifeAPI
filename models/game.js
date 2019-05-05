const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: String,
    traits: {
        trait1: String,
        trait2: String,
        trait3: String,
        trait4: String,
        trait5: String
    },
    Avatars: [{
        name: String,
        trait1: Number,
        trait2: Number,
        trait3: Number,
        trait4: Number,
        trait5: Number
    }],
    Questions: [{
        Q: String,
        responses: [
            { r1: String, oc: [{ trait: String, amount: Number, upDown: String }] },
            { r2: String, oc: [{ trait: String, amount: Number, upDown: String }] },
            { r3: String, oc: [{ trait: String, amount: Number, upDown: String }] },
            { r4: String, oc: [{ trait: String, amount: Number, upDown: String }] },
            { r5: String, oc: [{ trait: String, amount: Number, upDown: String }] }
        ],
        trait1: String,
        trait2: String
    }]
});

// const Game = mongoose.model("Game", gameSchema);
const Game = mongoose.model("Game", new Schema({ wholeGame: String }))
module.exports = Game;