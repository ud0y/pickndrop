const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            if (err) reject(err);
            resolve(match);
        });
    });
};

module.exports.hashPassword = (password, saltRound = 10) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRound, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
};

module.exports.generateJWT = async (id) => {
    const token = await jwt.sign(
        {
            id: id,
        },
        process.env.JWT_SECRET
    );
    return token;
};