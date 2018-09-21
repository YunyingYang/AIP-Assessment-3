const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserMovieRatingInput(data) {
    let errors = {};

    data.rating = !isEmpty(data.rating) ? data.rating : '';

    if (Validator.isDecimal(data.rating) && data.rating <= 5.0 && data.rating > 0) {
        errors.rating = 'Rating needs to between 0.0 and 5.0';
    }

    if (!Validator.isDecimal(data.rating)) {
        errors.rating = 'Rating needs to a decimal number';
    }

    if (Validator.isEmpty(data.rating)) {
        errors.rating = 'Please rate the movie before submit';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};