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
        type: String,
        required: [true, "Author is required!"]
    },
    details: {
        type: String,
        required: [true, "Details is required!"]
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