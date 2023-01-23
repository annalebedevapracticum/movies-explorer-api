const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const CustomError = require('../helpers/CustomError');
const { signInValidation, signUpValidation } = require('../helpers/validation');
const { checkAuth } = require('../middlewares/auth');

router.use('/movies', checkAuth, require('./movies'));
router.use('/users', checkAuth, require('./users'));

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('*', checkAuth, (req, res, next) => next(new CustomError('url not found', 404)));

module.exports = router;
