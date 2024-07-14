const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ServerConfig, Logger } = require('../config/index');
const { InternalServerError } = require('../errors/index');

function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        Logger.error('Some error occured while checking passwords');
        throw new InternalServerError('Some internal server error happened while checking passwords');
    }
}

function createToken(input) {
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});
    } catch (error) {
        Logger.error('Some error occured while creating web token');
        throw new InternalServerError('Some internal server error happened while creating token');
    }
}

module.exports = {
    checkPassword,
    createToken
};