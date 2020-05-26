const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

//Cloudinary
cloudinary.config({
  cloud_name: "du4arxzzj",
  api_key: "821499727673838",
  api_secret: "hDcEoltxpFdpSkkBeffwV7-Rqso",
});
// Controllers

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
