const express = require('express');
const controller = require('../controllers/bookController');
const router = express.Router();

//GET /books - send all books to the user
router.get('/', controller.index);

//GET /books/literatureFiction - send all books to the user
router.get('/literatureFiction', controller.literatureFiction);

//GET /books/literatureFiction - send all books to the user
router.get('/scifiFantasy', controller.scifiFantasy);

//GET /newTrade - send html form for creating a new book
router.get('/new', controller.new);

//POST /books - create a new book
router.post('/', controller.create);

//GET /books/:id - send details of book identified by id
router.get('/:id', controller.show);

//GET /books/:id/edit - send html form for editing an existing book
router.get('/:id/edit', controller.edit);

//PUT /books/:id - update the book identified by id
router.put('/:id', controller.update);

//DELETE /books/:id - delete the book identified by id
router.delete('/:id', controller.delete);

module.exports = router;