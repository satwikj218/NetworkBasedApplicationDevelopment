const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

//GET /books - send all books to the user
router.get('/', controller.home);

module.exports = router;