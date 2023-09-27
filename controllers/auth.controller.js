const User = require("../models/peopleModel");
const {
    hashPassword,
    generateJWT,
} = require("../utils/authUtils");

module.exports.authSignup = async (req, res, role) => {
    try {
        console.log(req.body);
        req.body.password = await hashPassword(req.body.password, 10);
        if (role) {
            req.body.role = role;
        }
        const newUser = await User.create(req.body);
        const user = JSON.parse(JSON.stringify(newUser));
        delete user.password;
        const token = await generateJWT(user._id);
        return {
            user,
            token,
        };
    } catch (error) {
        return res.status(500).json({
            error,
            error: error.message,
            message: "Something went wrong on signup!",
        });
    }
};