const express = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {loginLimiter} = require('../middlewares/rateLimiters');
const { validateSignUp, validateLogin, validateResult } = require('../middlewares/validator');

const router = express.Router();

//GET /stories: send all stories to the user
router.get('/', controller.index);

//GET /users/new: send html form for creating a new user account
router.get('/new', isGuest, controller.new);

//GET /users: create a new user account
router.post('/', isGuest, validateSignUp, validateResult, controller.create);

//GET /users/login: send html for loggin in
router.get('/login', isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', loginLimiter, isGuest, validateLogin, controller.login);

//GET /users/profile: Get the user profile
router.get('/profile', isLoggedIn, controller.profile);

//GET /users/logout: logout the user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;