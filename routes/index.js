const userRoutes = require('./users');
const movieRoutes = require('./movies');
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
        name: Joi.string().required().min(2).max(30),
    }),
}), createUser);

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
}), login);

router.use(cookieParser());
router.use(auth);

router.post('/signout', (req, res) => {
    res.clearCookie('cookie').send({ message: 'Выход' });
});

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
    next(new NotFoundError('Страница не существует.'));
});

module.exports = router;
