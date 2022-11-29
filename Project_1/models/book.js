const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    category: {
        type: String,
        required: [true, "Category is required!"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    details: {
        type: String,
        required: [true, "Details is required!"],
        minLength: [10, "The details should have at least 10 characters"]
    },
    status: {
        type: String,
        required: [true, "Status is required!"]
    },
    image: {
        type: String,
        required: [true, "Image Url is required!"]
    }
},
{timestamps: true}
);

//collection name is books in the database
module.exports = mongoose.model('Book', bookSchema);