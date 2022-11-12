const model = require('../models/book');

//GET /books - send all books to the user
exports.index = (req, res, next) => {
    model.find()
    .then(books => res.render('./book/trade', {books}))
    .catch(err => next(err));
};

//GET /books/literatureFiction - send books belonging to literature & fiction category
exports.literatureFiction = (req, res) => {
    model.find()
    .then(books => res.render('./book/literatureFiction', {books}))
    .catch(err => next(err));
};

//GET /books/sci-fiFantasy - send books belonging to sci-fi & fantasy
exports.scifiFantasy = (req, res) => {
    model.find()
    .then(books => res.render('./book/scifiFantasy', {books}))
    .catch(err => next(err));
};

//GET /books/new - send html form for creating a new book
exports.new = (req, res) => {
    res.render('./book/newTrade');
};

//POST /books - create a new book
exports.create = (req, res, next) => {
    let book = new model(req.body);
    book.save()
    .then(book => res.redirect("/books"))
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

//GET /books/:id - send details of book identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    //an objectId is 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid book Id");
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(book => {
        if(book){
            res.render('./book/show', {book});
        }
        else{
            let err = new Error("Cannot find a book with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch();    
};

//GET /books/:id/edit - send html form for editing an existing book
exports.edit = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid book Id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(book => {
        if(book) {
            res.render('./book/edit', {book});
        } else {
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

//PUT /books/:id - update the book identified by id
exports.update = (req, res, next) => {
    let book = req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid story Id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, book, {useFindAndModify: false, runValidators: true})
    .then(book => {
        if(book){
            res.redirect('/books/'+id);
        }
        else{
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name = "ValidationError"){
            err.status = 400;
        }
        next(err);
    });
};

//DELETE /books/:id - delete the book identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid book Id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false, runValidators: true})
    .then(book => {
        if(book){
            res.redirect('/books/');
        }
        else{
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};