const express = require('express');

const v1Router = require('./v1');
const { InfoController } = require('../controllers/index');
const { AuthMiddleware } = require('../middlewares/index');

const apiRouter = express.Router();

apiRouter.use('/v1', v1Router);

apiRouter.get('/info', AuthMiddleware.checkAuth, InfoController.info);

module.exports = apiRouter;