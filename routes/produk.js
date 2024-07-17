const express = require("express");
const produkController = require("../controllers/produk");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getProduk", produkController.getProduk);

module.exports = router;
