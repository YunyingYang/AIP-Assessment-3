const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserMovieRatingInput(data) {
    let errors = {};

    data.rating = !isEmpty(data.rating) ? String(data.rating) : '';

    if (Validator.isDecimal(data.rating) && (parseFloat(data.rating) > 10 || parseFloat(data.rating) <= 0)) {
        errors.rating = 'Rating needs to between 0.0 and 10.0';
    }

    if (!Validator.isDecimal(data.rating)) {
        errors.rating = 'Rating needs to a decimal number';
    }

    if (Validator.isEmpty(data.rating)) {
        errors.rating = 'Please rate the movie before submit';
    }

    if (Validator.isEmpty(data.movieID)) {
        errors.movie = 'Movie ID is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};