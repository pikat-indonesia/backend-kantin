const express = require("express");
const tableController = require("../controllers/table");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getTable", checkAuth, tableController.getTable);
router.post("/addTable", checkAuth, tableController.addTable);
router.post("/editTable", checkAuth, tableController.editTable);
router.post("/deleteTable", checkAuth, tableController.deleteTable);

module.exports = router;
