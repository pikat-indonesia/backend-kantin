const express = require("express");
const tableController = require("../controllers/table");

const router = express.Router();
router.post("/getTable", tableController.getTable);
router.post("/addTable", tableController.addTable);
router.post("/editTable", tableController.editTable);
router.post("/deleteTable", tableController.deleteTable);

module.exports = router;
