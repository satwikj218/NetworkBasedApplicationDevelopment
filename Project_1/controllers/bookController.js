const model = require('../models/book');
const offerModel = require('../models/tradeOffer');

//GET /books - send all books to the user
exports.index = (req, res, next) => {
    model.find()
    .then(books => res.render('./book/trade', { books }))
    .catch(err => next(err));
};

//GET /books/literatureFiction - send books belonging to literature & fiction category
exports.literatureFiction = (req, res) => {
    model.find()
    .then(books => res.render('./book/literatureFiction', { books }))
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
    book.author = req.session.user;
    book.offerType = "";
    book.offered = false;
    book.watch = false;
    book.save()
    .then(book => {
        req.flash('success', "Story has been created successfully");
        res.redirect('/books')
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            err.status = 400;
        }
        next(err);
    });
};

//GET /books/:id - send details of book identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
    .then(book => {
        if(book){
            return res.render('./book/show', {book});
        }
        else {
            let err = new Error("Cannot find a book with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

//GET /books/:id/edit - send html form for editing an existing book
exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(book => {
        if(book) {
           return res.render('./book/edit', {book});
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
    model.findByIdAndUpdate(id, book, {useFindAndModify: false, runValidators: true})
    .then(book => {
        if(book){
            res.redirect('/books/' + id);
        }
        else{
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name = "ValidationError")
            err.status = 400;
        next(err);
    });
};

//DELETE /books/:id - delete the book identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(book => {
            if (book) {
                req.flash('success', 'Deletion Successful');
                res.redirect('/books');
            }
            else {
                let err = new Error('Cannot find a book with id ' + id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
};

exports.watch = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(book => {
        if (book) {
            book.watch = true;
            book.save()
            .then(book => {
                req.flash('success', "Successfully updated watch for the book", book.title);
                res.redirect('/users/profile');
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);
            });
        }
        else {
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
};

exports.unWatch = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(book => {
        if (book) {
            book.watch = false;
            book.save()
                .then(book => {
                    req.flash('success', "Successfully updated unwatch for the book", book.title);
                    res.redirect('/users/profile');
                })
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        req.flash('error', err.message);
                        return res.redirect('/back');
                    }
                    next(err);
                });
        }
        else {
            let err = new Error('Cannot find a book with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
};

exports.trade = (req, res, next) => {
    let user = req.session.user;
    id = req.params.id;
    model.findByIdAndUpdate(id, { status: "Offer Pending", offered: true }, {useFindAndModify: false, runValidators: true})
    .then((book) => {
        let newOffer = new offerModel({
            name: book.title,
            status: "Offer Pending",
            category: book.category,
            offeredBy: user,
        });
        newOffer.save()
        .then((book) => {
            model.find({author: user})
            .then((items) => {
                res.render('./book/itemTrade', {items});
            })
            .catch((err) => {
                next(err);
            });
        })
        .catch((err) => {
            next(err);
        });
    })
    .catch((err) => {
        next(err);
    });
};

exports.bookToTrade = (req, res, next) => {
    let id = req.params.id;
    let user = req.session.user;
    Promise.all([
      model.findByIdAndUpdate(id,{ status: "Offer Pending" },{useFindAndModify: false, runValidators: true}),
      offerModel.findOne({ offeredBy: user })
    ])
    .then((results) => {
        const [item, offered] = results;
        let name = offered.name;
        model.findByIdAndUpdate(id,{ offerType: name },{useFindAndModify: false, runValidators: true})
        .then((item) => {
            req.flash("success", "Offer Created");
            res.redirect("/users/profile");
        })
        .catch((err) => {
            next(err);
        });
    })
    .catch((err) => {
        next(err);
    });
};

exports.deleteOffer = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndUpdate(id, { status: "Available", offered: false }, {useFindAndModify: false, runValidators: true})
    .then((item) => {
        let name = item.title;
  
        Promise.all([model.findOneAndUpdate({ offerType: name }, { status: "Available", offerType: "" }),
        offerModel.findOneAndDelete({ name: name }, { useFindAndModify: false })])
        .then((results) => {
            const [item, offer] = results;
            req.flash("success", "Offer cancelled successfully");
            res.redirect("/users/profile");
        })
        .catch((err) => {
            next(err);
        });
    })
    .catch((err) => {
        next(err);
    });
};