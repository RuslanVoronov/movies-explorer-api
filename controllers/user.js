const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
    const { name, email, password, } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => User.create({
            name, email, password: hash,
        }))
        .then((user) => res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
        }))
        .catch((err) => {
            if (err.code === 11000) {
                next(new ConflictError('Пользователь с таким email уже существует'));
            } else if (err.message === 'ValidationError') {
                next(new ValidationError('Переданы некорректные данные'));
            } else {
                next(err);
            }
        });
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
            res.cookie('cookie', token, { httpOnly: true });
            res.send({ token });
        })
        .catch(next);
};

const getUser = (req, res, next) => {
    const id = req.user._id;
    User.findById(id)
        .then((user) => {
            res.send(user);
        })
        .catch(next);
};

const updateUser = (req, res, next) => {
    const { name, email } = req.body;
    User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        {
            new: true,
            runValidators: true,
        },
    )
        .then((user) => res.send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new ValidationError('Переданы некорректные данные'));
            } else {
                next(err);
            }
        });
};

module.exports = {
    createUser,
    login,
    getUser,
    updateUser,
};
