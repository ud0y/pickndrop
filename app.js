const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vehicleRoute = require("./routes/vehicle");
const userRoute = require("./routes/user");
require("dotenv/config");

// import Route
app.use(cors());
app.use(bodyParser.json());

// connect to mongoose server
// mongoose.connect(process.env.PICKNDROP_DB, () => {
//     console.log("Connected to DB!");
// });

mongoose.connect(process.env.PICKNDROP_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
});

// Route configuration
app.use("/vehicle", vehicleRoute);
app.use("/user", userRoute);

app.all("*", (req, res, next) => {
    console.log(`not found ${req.originalUrl}`);
    return ("Not found!");
});

// start listening
app.listen(8000);
