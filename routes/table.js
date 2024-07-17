const express = require("express");
const tableController = require("../controllers/table");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getTable", checkAuth, tableController.getTable);
router.post("/addTable", tableController.addTable);
router.post("/editTable", tableController.editTable);
router.post("/deleteTable", tableController.deleteTable);

module.exports = router;
