const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");

// Create user
router.post("/create", controller.createUser);
// Login
router.post("/login", controller.login);

module.exports = router;
