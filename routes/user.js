const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.post("/login", userController.userLogin);
router.post("/hash", userController.hashPassword);

module.exports = router;
