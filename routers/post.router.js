const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/post.controller");

//End ponit post status
router.get("/status", controller.getPosts);

router.post("/status", upload.single("fileImagePost"), controller.postStatus);

module.exports = router;
