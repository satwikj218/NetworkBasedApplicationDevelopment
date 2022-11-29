const User = require('../models/user');
exports.index = (req, res, next)=>{
    //res.send('send all stories');
    res.render('./user/index');
};

exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.create = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    // .then(() => res.redirect('/users/login'))
    .then(result => {
        if(result){
            req.session.user = user._id; //stores user's id in the session
            req.flash('success', "You have successfully signed up");
            res.redirect('/users/login');
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            res.redirect('/users/new');
        }

        if(err.code === 11000){
            req.flash('error', "Email address has been used");
            res.redirect('/users/new');
        }

        next(err);
    });    
};

exports.login = (req, res, next)=>{
    res.render('./user/login');
};

exports.loginProcess = (req, res, next)=>{
    //authenticate user's body request
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email
    User.findOne({email: email})
    .then(user => {
        if(user){
            //user found in the database
            user.comparePassword(password)
            .then(result => {
                if(result){
                    req.session.user = user._id; //stores user's id in the session
                    req.flash('success', "You have successfully logged in");
                    res.redirect('/users/profile');
                }
                else{
                    // console.log("Wrong Password");
                    req.flash('error', "Wrong Password");
                    res.redirect('/users/login');
                }
            })
        }
        else{
            //console.log('Wrong Email address');
            req.flash('error', "Wrong Email Address");
            res.redirect('/users/login');
        }
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    User.findById(id)
    .then(user => res.render('./user/profile', {user}))
    .catch(err => next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err => {
        if(err)
            return next(err);
        else
            res.redirect('/users/login');
    });
};