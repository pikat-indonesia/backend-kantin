const express = require("express");
const menuController = require("../controllers/menu");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getMenu", menuController.getMenu);
router.post("/addMenu", checkAuth, menuController.addMenu);
router.post("/editMenu", checkAuth, menuController.editMenu);
router.post("/deleteMenu", checkAuth, menuController.deleteMenu);

module.exports = router;
