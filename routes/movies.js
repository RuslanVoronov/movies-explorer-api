const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { celebrate, Joi } = require('celebrate');

router.get('/', getMovies);

router.post('/', celebrate({
    body: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().min(4).max(4).required(),
        description: Joi.string().required(),
        image: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/i),
        thumbnail: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/i),
        trailerLink: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+/i),
        movieId: Joi.number().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
    })
}), createMovie);

router.delete('/:_id', celebrate({
    body: Joi.object().keys({
        movieId: Joi.string().required().length(24).hex()
    })
}), deleteMovie);

module.exports = router;