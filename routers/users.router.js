const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../utils/auth.middleware");

router.post ("/",authMiddleware.authenticateToken,usersController.registerUser);
router.get ("/",authMiddleware.authenticateToken, usersController.getUsers);
router.post ("/login", usersController.loginUser);

module.exports = router;
