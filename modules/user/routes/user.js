const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

// Definir rutas
router.get("/me", auth.authenticateUser, userController.login);
router.post("/login", userController.login);
router.post("/signup", userController.signup);

// Exportar router
module.exports = router;