const { StatusCodes } = require('http-status-codes');

const { Logger } = require('../config/index');
const { BadRequestError } = require('../errors/index');

function validateAuthRequest(req, res, next) {
    if(!req.body.username) {
        Logger.error("Bad request made while authenticating user");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "User not logged in",
            error: new BadRequestError("username", "Username not present in the incoming request."),
            data: {}
        });
    }

    if(!req.body.email) {
        Logger.error("Bad request made while authenticating user");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "User not logged in",
            error: new BadRequestError("email", "Email not present in the incoming request."),
            data: {}
        });
    }

    if(!req.body.password) {
        Logger.error("Bad request made while authenticating user");
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "User not logged in",
            error: new BadRequestError("password", "Password not present in the incoming request."),
            data: {}
        });
    }
    next();
} 

module.exports = {
    validateAuthRequest,
}