const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ServerConfig, Logger } = require('../config/index');

function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        Logger.error(error.details);
        throw error;
    }
}

function createToken(input) {
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});
    } catch (error) {
        Logger.error(error.details);
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        Logger.error(error.details);
        throw error;
    }
}

module.exports = {
    checkPassword,
    createToken,
    verifyToken
};