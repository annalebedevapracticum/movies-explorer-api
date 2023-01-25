const router = require('express').Router();
const {
  createMovie, deleteMovie, getMovies,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../helpers/validation');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
