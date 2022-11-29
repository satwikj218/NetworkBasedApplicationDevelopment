const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//GET /stories: send all stories to the user

router.get('/', controller.index);

//GET /users/new: send html form for creating a new story

router.get('/new', controller.new);

//GET /users: send all stories to the user

router.post('/login', controller.create);

//GET /users/login: Get the login page

router.get('/login', controller.login);

//POST /users/login: Process login request

router.post('/profile', controller.loginProcess);

//GET /users/profile: Get the user profile
router.get('/profile', controller.profile);

//GET /users/logout: Logout the user
router.get('/logout', controller.logout);

module.exports = router;