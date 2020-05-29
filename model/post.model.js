const mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
  {
    idUser: String,
    title: String,
    description: String,
    imagePosUrl: String,
    comment: Array,
    like: Array,
  },
  {
    timestamps: true,
  }
);
let Posts = mongoose.model("Posts", postSchema, "post");
module.exports = Posts;
