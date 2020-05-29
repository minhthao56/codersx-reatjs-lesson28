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

// get data post form DB
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
      comment: post.comment,
      like: post.like,
    };
  });

  const users = allUser.map(function (user) {
    return {
      id_user: user._id.toString(),
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  });
  let allPosted = [];
  for (post of Posts) {
    for (user of users) {
      if (post.idUser === user.id_user) {
        let postAndUser = Object.assign(post, user);
        allPosted.push(postAndUser);
      }
    }
  }

  for (let posted of allPosted) {
    for (let comment of posted.comment) {
      for (let user of users) {
        if (comment.id_user_commented === user.id_user) {
          Object.assign(comment, user);
        }
      }
    }
  }

  res.json(allPosted);
};
// Post moment in to post
module.exports.postComments = async function (req, res) {
  const comment = req.body;
  const commentedPost = await Post.findOneAndUpdate(
    { _id: comment.id_post },
    {
      $addToSet: { comment: comment },
    },
    { upsert: true, new: true, runValidators: true }
  );
  res.json(commentedPost);
};

// Update Like
module.exports.postLike = async function (req, res) {
  const like = req.body;
  const likedPost = await Post.findOneAndUpdate(
    { _id: like.id_post },
    {
      $addToSet: { like: like },
    },
    { upsert: true, new: true, runValidators: true }
  );
  res.json(likedPost);
};

// Remove Like
module.exports.postUnLike = async function (req, res) {
  const unlike = req.body;
  const likedPost = await Post.findOne({ _id: unlike.id_post });
  const listLike = likedPost.like;
  const userLiked = listLike.map(function (like) {
    return like.id_user_liked;
  });
  const indexOf = userLiked.indexOf(unlike.id_user_liked);
  const cutUseLike = listLike.splice(indexOf, 1);
  const save = await Post.findByIdAndUpdate(
    { _id: unlike.id_post },
    {
      $set: { like: listLike },
    }
  );
  res.json(likedPost);
};

// postNotification
module.exports.postNotification = async function (req, res) {
  const notification = req.body;
  if (notification.id_user_post === notification.id_user_liked) {
    return res.json("người like là người đăng bài nha!!");
  }
  const notificationForUser = await Users.findOneAndUpdate(
    { _id: notification.id_user_post },
    {
      $addToSet: { notification: notification },
    },
    { upsert: true, new: true, runValidators: true }
  );
  res.json(notificationForUser);
};

//get notification
module.exports.getNotification = async function (req, res) {
  const q = req.query.q;

  const allUserModel = await Users.find();
  const allUser = allUserModel.map(function (user) {
    return {
      idUser: user._id.toString(),
      name: user.name,
    };
  });

  const allPostModel = await Post.find();
  const allPost = allPostModel.map(function (post) {
    return {
      idPost: post._id.toString(),
      title: post.title,
    };
  });

  const userQuery = await Users.findOne({ _id: q });
  const notification = userQuery.notification;

  const notificationUser = [];
  for (user of allUser) {
    for (noti of notification) {
      if (user.idUser === noti.id_user_liked) {
        const mapUser = Object.assign(noti, user);
        notificationUser.push(mapUser);
      }
    }
  }
  for (post of allPost) {
    for (noti of notification) {
      if (post.idPost === noti.id_post) {
        Object.assign(noti, post);
      }
    }
  }
  res.json(notificationUser);
};
