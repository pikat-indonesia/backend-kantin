const express = require("express");
const produkController = require("../controllers/produk");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getProduk", checkAuth, produkController.getProduk);
router.post("/getProdukResi", checkAuth, produkController.getProdukResi);

module.exports = router;
