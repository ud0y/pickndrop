const express = require("express");
const Vehicle = require("../models/vehicleModel")

module.exports.getAll = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});

        return res.status(200).json({
            length: vehicles.length,
            vehicles,
        });
    } catch (error) {
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong!",
        });
    }
};

module.exports.addVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        const vahicleInfo = JSON.parse(JSON.stringify(vehicle));
        return res.status(201).json({
            vahicleInfo,
        });
    } catch (error) {
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong on adding vehicle!",
        });
    }
};

module.exports.updateVehicleInfo = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json({
            vehicle,
        });
    } catch (error) {
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong on updating vehicle!",
        });
    }
};