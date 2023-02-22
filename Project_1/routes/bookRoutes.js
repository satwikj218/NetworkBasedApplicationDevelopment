const express = require('express');
const controller = require('../controllers/bookController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId, validateBook} = require("../middlewares/validator");
const router = express.Router();

//GET /books - send all books to the user
router.get('/', controller.index);

//GET /books/literatureFiction - send all books to the user
router.get('/literatureFiction', controller.literatureFiction);

//GET /books/literatureFiction - send all books to the user
router.get('/scifiFantasy', controller.scifiFantasy);

//GET /newTrade - send html form for creating a new book
router.get('/new', isLoggedIn, controller.new);

//POST /books - create a new book
router.post('/', isLoggedIn, validateBook, controller.create);

//GET /books/:id - send details of book identified by id
router.get('/:id', validateId, controller.show);

//GET /books/:id/edit - send html form for editing an existing book
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /books/:id - update the book identified by id
router.put('/:id', validateId, isLoggedIn, isAuthor, validateBook, controller.update);

//DELETE /books/:id - delete the book identified by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

router.post('/:id/watch', validateId, isLoggedIn, controller.watch);

router.post('/:id/unwatch', validateId, isLoggedIn, controller.unWatch);

router.get("/:id/trade", controller.trade);

router.get("/:id/bookToTrade", controller.bookToTrade);

router.delete("/:id/deleteOffer", controller.deleteOffer);

module.exports = router; 