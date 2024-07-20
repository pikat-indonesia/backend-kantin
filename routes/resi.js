const express = require("express");
const resiController = require("../controllers/resi");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getResi", checkAuth, resiController.getResi);
router.post("/addResi", checkAuth, resiController.addResi);
router.post("/countBarang", checkAuth, resiController.countBarang);
router.post("/countCost", checkAuth, resiController.countCost);
router.post("/getPenjualan", checkAuth, resiController.getPenjualan);

module.exports = router;
