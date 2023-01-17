const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie, deleteMovie, getMovies,
} = require('../controllers/movies');
const { urlRegex } = require('../helpers/utils');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().regex(urlRegex).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().regex(urlRegex).required(),
    movieId: Joi.string().required().hex(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex(),
  }),
}), deleteMovie);

module.exports = router;
