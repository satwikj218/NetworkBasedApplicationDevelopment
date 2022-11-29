const User = require('../models/user');
const Book = require('../models/book');

exports.index = (req, res, next) => {
    res.render('./user/index');
};

exports.new = (req, res) => {
    res.render('./user/new');
};

exports.create = (req, res, next) => {
    let user = new User(req.body);

    user.save()
    .then(user => res.redirect('/users/login'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('users/new');
        }

        if(err.code === 11000){
            req.flash('error', "Email address has been used");
            return res.redirect('/users/new');
        }

        next(err);
    });
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

exports.login = (req, res, next) => {
    //authenticate user's body request
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email
    User.findOne({email: email})
    .then(user => {
        if(!user){
            console.log("Wrong Email Address");
            req.flash('error', "Wrong email address");
            res.redirect('/users/login');
        }
        else{
            user.comparePassword(password)
            .then(result => {
                if(result){
                    req.session.user = user._id;
                    req.flash('success',"You have successfully logged in");
                    res.redirect('/users/profile');
                }
                else{
                    req.flash('error', "Wrong Password");
                    res.redirect('/users/login');
                }
            });
        }
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id), Book.find({author: id})])
    .then(results => {
        const [user, books] = results;
        res.render('./user/profile', {user, books});
    })
    .catch(err => next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if(err)
            return next(err);
        else
            res.redirect('/users/login');
    });
};