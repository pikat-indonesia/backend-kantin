const express = require("express");
const resiController = require("../controllers/resi");

const router = express.Router();
router.post("/getResi", resiController.getResi);
router.post("/addResi", resiController.addResi);

module.exports = router;
