const Post = require("../model/post.model");
const cloudinary = require("cloudinary").v2;
const Users = require("../model/users.model");

//Cloudinary
cloudinary.config({
  cloud_name: "du4arxzzj",
  api_key: "821499727673838",
  api_secret: "hDcEoltxpFdpSkkBeffwV7-Rqso",
});

//Create a post
module.exports.postStatus = async function (req, res) {
  // console.log(req.file.path);
  // console.log(req.body.user);
  // console.log(req.body.title);
  // console.log(req.body.description);

  let path = req.file.path;
  var result = await cloudinary.uploader.upload(path, function (error, result) {
    console.log(error);
  });
  let imagePosUrl = result.url;
  let title = req.body.title;
  let description = req.body.description;
  let idUser = req.body.user;

  let dataPost = await Post.insertMany({
    idUser: idUser,
    title: title,
    description: description,
    imagePosUrl: imagePosUrl,
  });
  res.json(dataPost);
};

// get dato post form DB
module.exports.getPosts = async function (req, res) {
  const allUser = await Users.find();
  const allPost = await Post.find();
  const Posts = allPost.map(function (post) {
    return {
      id_post: post._id.toString(),
      idUser: post.idUser,
      title: post.title,
      description: post.description,
      imagePosUrl: post.imagePosUrl,
      createdAt: post.createdAt,
    };
  });

  const users = allUser.map(function (user) {
    return {
      id_user: user._id.toString(),
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  });
  let allUserPosted = [];
  for (post of Posts) {
    for (user of users) {
      if (post.idUser === user.id_user) {
        let postAndUser = Object.assign(post, user);
        allUserPosted.push(postAndUser);
      }
    }
  }
  res.json(allUserPosted);
};
