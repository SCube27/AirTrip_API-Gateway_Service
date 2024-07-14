const express = require('express');

const { UserController } = require('../../controllers/index');

const userRouter = express.Router();

userRouter.post('/signup', UserController.signUp);

userRouter.post('/login', UserController.logIn);

module.exports = userRouter;