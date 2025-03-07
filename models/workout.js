const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  title: { type: String, required: true },
  level: { 
    type: String, 
    required: true, 
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Athlete'] 
  },
  minutes: { type: Number, required: true },
  cover: { type: String, required: true },
  description: { type: String, required: true },
  workouts: { type: Number, required: true },
  kcal: { type: Number, required: true },
  exercises: [{
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: { type: Number },
    repetitions: { type: Number },
    time: { type: Number },
    timeUnit: { type: String, enum: ['seconds', 'minutes'] }
  }]
}, { timestamps: true });

module.exports = model('Workout', workoutSchema);
