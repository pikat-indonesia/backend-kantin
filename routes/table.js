const express = require("express");
const tableController = require("../controllers/table");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getTable", checkAuth, tableController.getTable);

module.exports = router;
