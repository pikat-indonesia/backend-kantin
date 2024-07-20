const express = require("express");
const favoriteController = require("../controllers/favorite");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getTableType", checkAuth, favoriteController.getTableType);

module.exports = router;
