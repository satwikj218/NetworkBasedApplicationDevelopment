const Story = require('../models/story');

//Check if the user is a guest
exports.isGuest = (req, res, next) => {
    if(!req.session.user)
        return next();
    else {
        req.flash('error', "You are logged in already");
        return res.redirect('/users/profile');
    }
};

//Check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user)
        return next();
    else {
        req.flash('error', "You need to log in first");
        return res.redirect('/users/login');
    }
};

//check if user is author of the story
exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;
    Story.findById(id)
    .then(story => {
        if(story){
            if(story.author == req.session.user){
                return next();
            }
            else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err => next(err));
};