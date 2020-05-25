const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  password: String,
  timestamps: true,
});
let Users = mongoose.model(Users, userSchema, "users");
module.exports = Users;
