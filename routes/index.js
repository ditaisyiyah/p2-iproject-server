const nasaController = require('../controllers/nasaController');
const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController');
const aneoQuery = require('../middlewares/aneoQuery');
const apodQuery = require('../middlewares/apodQuery');
const newsQuery = require('../middlewares/newsQuery');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/aneo', aneoQuery, nasaController.fetchAsteroid);

router.use(authentication);

router.get('/apod', apodQuery, nasaController.fetchPicture);
router.get('/news', newsQuery, newsController.fetchNews);


module.exports = router;