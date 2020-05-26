const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const controller = require("../controllers/users.controller");
// Create user
router.get("/create", function (req, res) {
  res.send("ok chưa");
});

router.post("/create", upload.single("fileavatar"), controller.createUser);

module.exports = router;
