const express = require("express");
const menuController = require("../controllers/menu");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getMenu", checkAuth, menuController.getMenu);
router.post("/getType", checkAuth, menuController.getType);

module.exports = router;
