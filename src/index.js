const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const { ServerConfig } = require('./config');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 3,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

app.use(limiter);

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
