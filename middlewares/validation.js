const { celebrate, Joi } = require('celebrate');
const { urlRegEx, imageRegEx } = require('../utils/constants')
const registerValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        name: Joi.string().required().min(2).max(30),
    }),
});

const loginValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
});

const createMovieValidation = celebrate({
    body: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().min(4).max(4).required(),
        description: Joi.string().required(),
        image: Joi.string().required().regex(imageRegEx),
        thumbnail: Joi.string().required().regex(imageRegEx),
        trailerLink: Joi.string().required().regex(urlRegEx),
        movieId: Joi.number().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
    })
});

const deleteMovieValidation = celebrate({
    body: Joi.object().keys({
        movieId: Joi.string().required().length(24).hex()
    })
});

const updateUserValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).max(30).required(),
    })
});

module.exports = { registerValidation, loginValidation, createMovieValidation, deleteMovieValidation, updateUserValidation }