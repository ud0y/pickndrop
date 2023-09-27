const express = require("express");
const router = express.Router();
const { getAll, addVehicle, updateVehicleInfo } = require("../controllers/vehicle.controller");

router.route("/").get(getAll);
router.route("/addvehicle").post(addVehicle);
router.route("/updatevehicle").post(updateVehicleInfo);

module.exports = router;