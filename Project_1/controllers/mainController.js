const model = require('../models/book');

//GET /books - send all books to the user
exports.home = (req, res) => {
    res.render('./index');
};