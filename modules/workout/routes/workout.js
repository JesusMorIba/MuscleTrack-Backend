const express = require("express");
const router = express.Router();
const workoutController = require("../controller/workout");
const authAdmin = require("../../admin/middlewares/auth");

// Definir rutas
router.get("/workout-feed", workoutController.getSuggestedWorkouts);
router.get("/:workoutId", workoutController.getWorkoutDetailById);
router.get("/", authAdmin.authenticateAdmin, workoutController.getAllWorkouts);  
router.post("/create-workout", authAdmin.authenticateAdmin, workoutController.createWorkout); 

// Exportar router
module.exports = router;