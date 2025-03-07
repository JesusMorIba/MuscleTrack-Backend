const Exercise = require('../../../models/exercise');

const createExercise = async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ status: "error", message: "El título, imageUrl y categoría son obligatorios." });
    }

    const exerciseToSave = new Exercise({ title, category, imageUrl });

    await exerciseToSave.save();

    return res.status(201).json({
      exercise: exerciseToSave,
    });


  } catch (error) {
    console.error('Error creating exercise:', error);
    return res.status(400).json({
      status: "error",
      message: error.message || "Ocurrió un error al registrar el ejercicio.",
    });
  }
};

const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    return res.status(200).json({
      total: exercises.length,
      exercises,
    });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return res.status(500).json({
      status: "error",
      message: "Ocurrió un error al obtener los ejercicios.",
    });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: "error", message: "El ID es obligatorio." });
    }

    const deletedExercise = await Exercise.findByIdAndDelete(id);

    if (!deletedExercise) {
      return res.status(404).json({ status: "error", message: "Ejercicio no encontrado." });
    }

    return res.status(200).json({
      status: "success",
      message: "Ejercicio eliminado correctamente",
      exercise: deletedExercise,
    });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    return res.status(500).json({
      status: "error",
      message: "Ocurrió un error al eliminar el ejercicio.",
    });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, imageUrl } = req.body;

    if (!id) {
      return res.status(400).json({ status: "error", message: "El ID es obligatorio." });
    }

    if (!title && !category && !imageUrl) {
      return res.status(400).json({ status: "error", message: "Se requiere al menos un campo para actualizar (título, categoría o URL de imagen)." });
    }

    const exerciseToUpdate = await Exercise.findById(id);

    if (!exerciseToUpdate) {
      return res.status(404).json({ status: "error", message: "Ejercicio no encontrado." });
    }

    if (title) exerciseToUpdate.title = title;
    if (category) exerciseToUpdate.category = category;
    if (imageUrl) exerciseToUpdate.imageUrl = imageUrl;

    await exerciseToUpdate.save();

    return res.status(200).json({
      exercise: exerciseToUpdate,
    });
  } catch (error) {
    console.error('Error updating exercise:', error);
    return res.status(500).json({
      status: "error",
      message: "Ocurrió un error al actualizar el ejercicio.",
    });
  }
};

module.exports = { createExercise, getExercises, deleteExercise, updateExercise };
