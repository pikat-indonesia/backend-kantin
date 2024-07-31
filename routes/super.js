const express = require("express");
const superController = require("../controllers/super");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
router.post("/getUser", checkAuth, superController.getUser);
router.post("/addUser", checkAuth, superController.addUser);
// router.post("/editUser", superController.editUser);
router.post("/deleteUser", checkAuth, superController.deleteUser);

module.exports = router;
