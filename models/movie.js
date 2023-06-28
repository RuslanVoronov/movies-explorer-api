const validator = require('validator');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        require: true,
    },
    director: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        require: true,
    },
    year: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
        validate: {
            validator: (string) => {
                return validator.isURL(string);
            },
        },
    },
    trailerLink: {
        type: String,
        require: true,
        validate: {
            validator: (string) => {
                return validator.isURL(string);
            },
        },
    },
    thumbnail: {
        type: String,
        require: true,
        validate: {
            validator: (string) => {
                return validator.isURL(string);
            },
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    movieId: {
        type: String,
        require: true,
    },
    nameRU: {
        type: String,
        require: true,
    },
    nameEN: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('movie', movieSchema);
