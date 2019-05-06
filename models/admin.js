const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
// Create Schema
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orgname: {
    type: String,
    require:true
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
