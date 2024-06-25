const express = require("express");
const tableController = require("../controllers/table");

const router = express.Router();
router.post("/getTable", tableController.getTable);

module.exports = router;
