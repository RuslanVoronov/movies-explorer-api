require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParse = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/log');
const { mongoUrl } = require('./utils/constants');
const helmet = require('helmet');
const { limiter } = require('./config/rateLimiter')
const { PORT = 3000 } = process.env;

mongoose.connect(mongoUrl);

const app = express();
app.use(bodyParse.json());
app.use(requestLogger);
app.use(limiter)
app.use(helmet());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Ваш сервер был запущен на порту : ${PORT}`);
});