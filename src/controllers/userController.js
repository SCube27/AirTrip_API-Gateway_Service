const { StatusCodes } = require('http-status-codes');

const { UserRepository } = require('../repositories/index');
const { UserService } = require('../services/index');

const userService = new UserService(new UserRepository());

async function signUp(req, res, next) {
    try {
        const user = await userService.createUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created a new user entry",
            error: {},
            data: user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUp,
}