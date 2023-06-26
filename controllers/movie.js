const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getMovies = (req, res, next) => {
    Movie.find({})
        .then((movie) => res.status(200).send(movie))
        .catch(next);
}

const createMovie = (req, res, next) => {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
    Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
        .then((movie) => res.status(201).send(movie))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new ValidationError('Некорректный id'));
            } else {
                next(err);
            }
        });
};

const deleteMovie = (req, res, next) => {
    const id = req.params._id;
    Movie.findById(id)
        .orFail(() => new NotFoundError('Несуществующий в БД id фильма'))
        .then((movie) => {
            movie.deleteOne()
                .then(() => res.send({ message: 'Фильм удалён' }))
                .catch(next);
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                next(new ValidationError('Некорректный id'));
            } else {
                next(err);
            }
        });
};

module.exports = { getMovies, createMovie, deleteMovie }