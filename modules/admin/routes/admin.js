const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const auth = require("../middlewares/auth");

// Definir rutas
router.post("/login", adminController.login);
router.post("/signup", adminController.signup);
router.get("/me", auth.authenticateAdmin, adminController.me);

// Exportar router
module.exports = router;