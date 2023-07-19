const router = require('express').Router();
const cookieParser = require('cookie-parser');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/user');
const { registerValidation, loginValidation } = require('../middlewares/validation');

router.post('/signup', registerValidation, createUser);

router.post('/signin', loginValidation, login);

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
