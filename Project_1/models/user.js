const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        unique: [true, "This email address has already been used"]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

//Replace plain-text password with hashed password before saving the document in the database
//pre middleware
userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    })
    .catch(err => (next(error)));
});

//Implement a method to compare the login password and the hash stored in the database
userSchema.methods.comparePassword = function(loginPassword){
    let user = this;
    return bcrypt.compare(loginPassword, user.password);
}

module.exports = mongoose.model('User', userSchema);