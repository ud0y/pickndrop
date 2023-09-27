const mongoose = require("mongoose");
const employee = require("./peopleModel")

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vehicle model name is required"],
    },
    number: {
        type: String,
        required: [true, "Please provide your vehicle registration number"],
        unique: true,
    },
    driverName: {
        type: String,
        required: [true, "Please provide your driver name"],
    },
    capacity: {
        type: Number,
        required: [true, "Please provide capacity of the vehicle"],
        minlength: 3,
    },
    assignedEmployees: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "employee",
        }],
        validate: [checkLimit, "{PATH} exceeds maximum capacity"]
    },
},
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });

function checkLimit(val) {
    return val <= this.capacity;
}

const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;
