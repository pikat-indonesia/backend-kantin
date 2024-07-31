const express = require("express");
const jenisController = require("../controllers/jenis");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getType", checkAuth, jenisController.getType);
router.post("/addType", checkAuth, jenisController.addType);
router.post("/editType", checkAuth, jenisController.editType);
router.post("/deleteType", checkAuth, jenisController.deleteType);

module.exports = router;
