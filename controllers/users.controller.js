const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

//Cloudinary
cloudinary.config({
  cloud_name: "du4arxzzj",
  api_key: "821499727673838",
  api_secret: "hDcEoltxpFdpSkkBeffwV7-Rqso",
});

//Create User
module.exports.createUser = async function (req, res) {
  //   let file = req.file.path;
  //   var result = await cloudinary.uploader.upload(patch, function (
  //     error,
  //     result
  //   ) {
  //     console.log(error);
  //   });
  req.body.avatarUrl =
    "https://res.cloudinary.com/du4arxzzj/image/upload/v1590497543/user_lp41pe.png";
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  await Users.insertMany(req.body);
  res.json(req.body);
};
//Loign
module.exports.login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Users.findOne({ email: email });
  console.log(user);
  if (!user) {
    res.status(401);
    res.json({ msg: "Email wrong" });
  } else if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ msg: "Password wrong" });
  } else {
    res.json(user);
  }
};
