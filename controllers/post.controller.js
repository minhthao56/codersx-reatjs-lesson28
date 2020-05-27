const Post = require("../model/post.model");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

//Cloudinary
cloudinary.config({
  cloud_name: "du4arxzzj",
  api_key: "821499727673838",
  api_secret: "hDcEoltxpFdpSkkBeffwV7-Rqso",
});

//Create User
module.exports.postStatus = async function (req, res) {
  console.log(req.file.path);
  console.log(req.body.user);
  console.log(req.body.post);
  let path = req.file.path;
  var result = await cloudinary.uploader.upload(path, function (error, result) {
    console.log(error);
  });
  let imagePosUrl = result.url;
  let description = req.body.post;
  let idUser = req.body.user;

  let dataPost = await Post.insertMany({
    idUser: idUser,
    title: "I am here",
    description: description,
    imagePosUrl: imagePosUrl,
  });
  res.json(dataPost);
};