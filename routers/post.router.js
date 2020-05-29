const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/post.controller");

//End ponit post status
router.get("/status", controller.getPosts);
router.post("/status", upload.single("fileImagePost"), controller.postStatus);

//comments and like
router.post("/comments", controller.postComments);
router.post("/like", controller.postLike);
router.post("/unlike", controller.postUnLike);

//Notification
router.get("/notification", controller.getNotification);
router.post("/notification", controller.postNotification);

module.exports = router;
