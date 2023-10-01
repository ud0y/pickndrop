const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name is required"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
    },
    address: String,
    arrival: String,
    departure: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    assignedTo: {
        type: String,
        default: "None",
    },
},
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

const User = mongoose.model("user", peopleSchema);

module.exports = User;
