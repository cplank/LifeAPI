const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: String,
    orgName: String,
    password: String,
    email: String
})