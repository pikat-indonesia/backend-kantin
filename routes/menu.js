const express = require("express");
const menuController = require("../controllers/menu");

const router = express.Router();
router.post("/getMenu", menuController.getMenu);

module.exports = router;
