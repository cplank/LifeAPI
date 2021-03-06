const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const traitsSchema = new Schema({
    trait1: String,
    trait2: String,
    trait3: String,
    trait4: String,
    trait5: String,
},
    { _id: false }
);

const avatarSchema = new Schema({
    name: String,
    picture: String,
    trait1: Number,
    trait2: Number,
    trait3: Number,
    trait4: Number,
    trait5: Number,
    tracking: [Number]

},
    { _id: false });

const outcomeSchema = new Schema({
    text: String,
    trait: String,
    amount: Number,
    upDown: String
},
    { _id: false });

const responsesSchema = new Schema({
    response: String,
    outcomes: [outcomeSchema]
},
    { _id: false });

const questionSchema = new Schema({
    Q: String,
    responses: [responsesSchema],
    trait1: String,
    trait2: String,
},
    { _id: false });


const gameSchema = new Schema({
    name: String,
    traits: traitsSchema,
    avatars: [avatarSchema],
    questions: [questionSchema],
    user: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
})

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;