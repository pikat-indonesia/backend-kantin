const express = require("express");
const resiController = require("../controllers/resi");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getResi", resiController.getResi);
router.post("/getPenjualan", resiController.getPenjualan);
router.post("/addResi", resiController.addResi);
router.post("/countCost", checkAuth, resiController.countCost);
router.post("/countBarang", checkAuth, resiController.countBarang);

module.exports = router;
