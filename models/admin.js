const { Schema, model } = require("mongoose");

const adminSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "default.png"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Admin", adminSchema);
