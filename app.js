require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/log');
const { mongoUrl } = require('./config/dataBase');
const { limiter } = require('./config/rateLimiter');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://films.nomoreparties.sbs',
  'http://films.nomoreparties.sbs',
  'https://api.films.nomoreparties.sbs',
  'http://api.films.nomoreparties.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
  '*',
];

mongoose.connect(mongoUrl);

const app = express();
app.options('*', cors({
  origin: allowedCors,
  credentials: true,
}));
app.use(bodyParse.json());
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ваш сервер был запущен на порту : ${PORT}`);
});
