const {Router} = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller.js"); 

router.post("/register", userCtrl.createUser);
router.post("/login", userCtrl.loginUser);
router.put("/user", userCtrl.updateUser);

module.exports = router; 