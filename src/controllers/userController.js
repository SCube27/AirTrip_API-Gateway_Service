const { StatusCodes } = require('http-status-codes');

const { UserRepository, RoleRepository } = require('../repositories/index');
const { UserService } = require('../services/index');

const userService = new UserService(new UserRepository(), new RoleRepository());

async function signUp(req, res, next) {
    try {
        const user = await userService.signupUser({
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

async function logIn(req, res, next) {
    try {
        const user = await userService.loginUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User logged in",
            error: {},
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function addRoletoUser(req, res, next) {
    try {
        const user = await userService.addRoletoUser({
            role: req.body.role,
            id: req.body.id,
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Added Role to User",
            error: {},
            data: user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    signUp,
    logIn,
    addRoletoUser
}