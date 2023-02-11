const CustomError = require('../helpers/CustomError');
const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError('Переданы некорректные данные при создании фильма', 400));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => {
      throw new CustomError('Фильм с указанным _id не найден', 404);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new CustomError('Доступ запрещен', 403);
      }
      return movie.remove().then(() => {
        res.send({ data: movie });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CustomError('Фильм с указанным _id не найден', 400));
      }
      next(err);
    });
};
