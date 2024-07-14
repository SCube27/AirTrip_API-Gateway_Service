const express = require('express');

const { UserController } = require('../../controllers/index');

const userRouter = express.Router();

userRouter.post('/signup', UserController.signUp);

module.exports = userRouter;