const express = require('express');
const bodyParser = require('body-parser');

const { ServerConfig } = require('./config');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const { Auth } = require('./utils/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
