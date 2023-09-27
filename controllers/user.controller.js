const User = require("../models/peopleModel");
const {
    comparePassword,
    generateJWT,
} = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
const { authSignup } = require("./auth.controller");

module.exports.signup = async (req, res) => {
    try {
        const { user, token } = await authSignup(req, res);
        return res.status(201).json({
            user,
            token,
            message: "Registration completed!",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong on signup!",
        });
    }
};

module.exports.signin = async (req, res) => {
    // console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email }).select(
            "+password"
        );
        // console.log(user);
        const matchPassword = await comparePassword(
            req.body.password,
            user.password
        );
        if (!matchPassword) {
            return res.status(500).json({
                message: "Wrong password!",
            });
        }
        // const userObj = JSON.parse(JSON.stringify(user));
        // console.log(user._id);
        delete user.password;
        const tokenId = await generateJWT(user._id);
        // console.log("token: ", tokenId);
        // console.log(userObj);
        // console.log(tokenId);
        // console.log({ user, tokenId });
        return res.status(201).json({
            user: user,
            token: tokenId,
            message: "Sign in completed!",
        });
    } catch (error) {
        // console.log(error.message);
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong on signin!",
        });
    }
};

module.exports.findMe = async (req, res) => {
    try {
        // console.log("new");
        console.log(req.body);
        const decode = jwt.decode(req.body.token);
        const user = await User.findById(decode.id);
        return res.status(201).json({
            user: user,
            token: req.body.token,
            message: "User data pulled",
        });
    } catch (error) {
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong on getting user data!",
        });
    }
};