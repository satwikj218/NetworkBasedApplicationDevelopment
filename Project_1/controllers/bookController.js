const model = require('../models/book');

//GET /books - send all books to the user
exports.index = (req, res) => {
    let books = model.find();
    res.render('./book/trade', {books});
};

//GET /books/literatureFiction - send books belonging to literature & fiction category
exports.literatureFiction = (req, res) => {
    let books = model.find();
    res.render('./book/literatureFiction', {books});
};

//GET /books/sci-fiFantasy - send books belonging to sci-fi & fantasy
exports.scifiFantasy = (req, res) => {
    let books = model.find();
    res.render('./book/scifiFantasy', {books});
};

//GET /books/new - send html form for creating a new book
exports.new = (req, res) => {
    res.render('./book/newTrade');
};

//POST /books - create a new book
exports.create = (req, res) => {
    let book = req.body;
    console.log(book);
    model.save(book);
    res.redirect("/books");
};

//GET /books/:id - send details of book identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    let book = model.findById(id);
    if(book){
        res.render('./book/show', {book});
    }
    else{
        let err = new Error("Cannot find a book with id " + id);
        err.status = 404;
        next(err);
    }
    
};

//GET /books/:id/edit - send html form for editing an existing book
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let book = model.findById(id);
    if(book){
        res.render('./book/edit', {book});
    }
    else{
        let err = new Error("Cannot find a book with id " + id);
        err.status = 404;
        next(err);
    }
};

//PUT /books/:id - update the book identified by id
exports.update = (req, res, next) => {
    let book = req.body;
    let id = req.params.id;

    if(model.updateById(id, book)){
        res.redirect('/books/'+id);
    }
    else{
        let err = new Error("Cannot find a book with id " + id);
        err.status = 404;
        next(err);
    }
};

//DELETE /books/:id - delete the book identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/books/');
    }
    else{
        let err = new Error("Cannot find a book with id " + id);
        err.status = 404;
        next(err);
    }
};