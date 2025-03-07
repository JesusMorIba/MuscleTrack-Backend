const Workout = require('../../../models/workout');
const Exercise = require('../../../models/exercise');

const getSuggestedWorkouts = async (req, res) => {
  try {
    const { level = 'Intermediate', page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const suggestedWorkouts = await Workout.find({ level })
      .skip(skip)
      .limit(Number(limit))
      .select('_id title cover minutes level');

    const totalWorkouts = await Workout.countDocuments({ level });

    const response = {
      workouts: suggestedWorkouts,
      total: totalWorkouts,
      page: Number(page),
      totalPages: Math.ceil(totalWorkouts / limit),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching suggested workouts:", error);
    res.status(500).json({ message: 'Error fetching suggested workouts', error: error.message });
  }
};

const getWorkoutDetailById = async (req, res) => { 
  try {
    const { workoutId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const exerciseIds = workout.exercises.map(ex => ex.exerciseId);
    
    const exercises = await Exercise.find({ _id: { $in: exerciseIds } }).select('title category imageUrl');

    const formattedExercises = workout.exercises.map(ex => ({
      exercise: exercises.find(e => e._id.equals(ex.exerciseId)) || {},
      sets: ex.sets,
      repetitions: ex.repetitions,
      time: ex.time,
      timeUnit: ex.timeUnit,
      _id: ex._id
    }));
 
    const formattedWorkout = {
      workout: {
        ...workout.toObject(),
        exercises: formattedExercises
      }
    };

    res.status(200).json(formattedWorkout);
  } catch (error) {
    console.error("Error fetching workout by ID:", error);
    res.status(500).json({ message: 'Error fetching workout by ID', error: error.message });
  }
};

const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await Workout.find();

    res.status(200).json({workout: allWorkouts});
  } catch (error) {
    console.error("Error fetching all workouts:", error);
    res.status(500).json({ message: 'Error fetching all workouts', error: error.message });
  }
};


const createWorkout = async (req, res) => {
  try {
    const { workout } = req.body;

    console.log(workout);

    if (!workout || !workout.title || !workout.level || !workout.minutes) {
      return res.status(400).json({ message: "Missing required fields in workout" });
    }

    if (!workout.cover || !workout.description || !workout.kcal) {
      return res.status(400).json({ message: "Missing required fields in workoutDetail" });
    }

    const filteredExercises = workout.exercises.map(exercise => {
      const filteredExercise = {};

      if (!exercise.exerciseId) {
        throw new Error('exerciseId is required');
      }
      filteredExercise.exerciseId = exercise.exerciseId;

      if (exercise.repetitions && !exercise.sets) {
        filteredExercise.repetitions = exercise.repetitions;
      } else if (exercise.sets && exercise.repetitions) {
        filteredExercise.sets = exercise.sets;
        filteredExercise.repetitions = exercise.repetitions;
      } else if (exercise.time || exercise.timeUnit) {
        if (exercise.sets || exercise.repetitions) {
          throw new Error('Cannot combine time with sets/repetitions');
        }
        filteredExercise.time = exercise.time;
        filteredExercise.timeUnit = exercise.timeUnit || (exercise.time ? 'seconds' : 'minutes');
      } else {
        throw new Error('Invalid exercise data: either sets/repetitions or time should be provided');
      }
      

      return filteredExercise;
    });

    const workoutToSave = new Workout({
      title: workout.title,
      level: workout.level,
      minutes: workout.minutes,
      cover: workout.cover,
      description: workout.description,
      workouts: filteredExercises.length,
      kcal: workout.kcal,
      exercises: filteredExercises
    });

    console.log(workoutToSave);

    const savedWorkout = await workoutToSave.save();

    res.status(201).json({ workout: savedWorkout });

  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: 'Error creating workout', error: error.message });
  }
};

module.exports = {
    getSuggestedWorkouts,
    getWorkoutDetailById,
    getAllWorkouts,
    createWorkout,
};
