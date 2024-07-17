const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.post("/login", userController.userLogin);
router.post("/hash", userController.hashPassword);
router.post("/dashboard", userController.dashboardLogin);

module.exports = router;
