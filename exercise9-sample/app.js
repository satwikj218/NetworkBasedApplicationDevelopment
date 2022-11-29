//require modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const User = require('./models/user');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://localhost:27017/demos', 
                {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.use(session({
    secret: 'jiaru90asdasdkbdskfbs',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/demos'})
}));

app.use(flash());

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

//get the signup form
app.get('/new', (req, res) => {
    res.render('new');
}); 

//create a new user
app.post('/', (req, res, next)=> {
    let user = new User(req.body);
    user.save()
    .then(() => res.redirect('/login'))
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            res.redirect('/new');
        }

        if(err.code === 11000){
            req.flash('error', "Email address has been used");
            res.redirect('/new');
        }

        next(err);
    });
});

//get the login page
app.get('/login', (req, res) => {
    res.render('login');
}); 

//process login request
app.post('/login', (req, res) => {
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
                    res.redirect('/profile');
                }
                else{
                    // console.log("Wrong Password");
                    req.flash('error', "Wrong Password");
                    res.redirect('/login');
                }
            })
        }
        else{
            //console.log('Wrong Email address');
            req.flash('error', "Wrong Email Address");
            res.redirect('/login');
        }
    })
    .catch(err => next(err));
});

//get profile
app.get('/profile', (req, res, next) => {
    let id = req.session.user;
    User.findById(id)
    .then(user => res.render('profile', {user}))
    .catch(err => next(err));
});

//logout the user
app.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if(err)
            return next(err);
        else
            res.redirect('/');
    });
});

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});
