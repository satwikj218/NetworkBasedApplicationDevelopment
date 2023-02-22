const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId, 
        ref: 'book'
    } 
});

module.exports =  mongoose.model('Watch', watchSchema);