const userRoutes = require('./user');
const movieRoutes = require('./movie');
const auth = require('../middlewares/auth');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/user');

router.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        name: Joi.string().min(2).max(30),
    }),
}), createUser);

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
}), login);

router.post('/signout', (req, res) => {
    res.clearCookie('cookie').send({ message: 'Выход' });
});

router.use(cookieParser());
router.use(auth);

router.use('/user', userRoutes);
router.use('/movie', movieRoutes);

router.use((req, res, next) => {
    next(new NotFoundError('Что-то пошло не так'));
});

module.exports = router;
