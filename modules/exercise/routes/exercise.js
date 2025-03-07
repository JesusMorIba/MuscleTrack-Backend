const express = require("express");
const router = express.Router();
const exerciseController = require("../controller/exercise");
const authAdmin = require("../../admin/middlewares/auth");

// Definir rutas
router.post("/create", authAdmin.authenticateAdmin, exerciseController.createExercise);
router.get("/", authAdmin.authenticateAdmin, exerciseController.getExercises);
router.delete('/delete/:id', authAdmin.authenticateAdmin, exerciseController.deleteExercise);
router.put('/update/:id', authAdmin.authenticateAdmin, exerciseController.updateExercise);

// Exportar router
module.exports = router;