const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: [
            "cardio", 
            "core", 
            "upper", 
            "lower", 
            "fullBody", 
            "arms", 
            "chest", 
            "back", 
            "shoulders", 
            "legs", 
            "glutes"
        ],
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
});

module.exports = model("Exercise", exerciseSchema);
