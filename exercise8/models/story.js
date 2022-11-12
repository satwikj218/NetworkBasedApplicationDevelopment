const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String, 
        required: [true, 'Title is required']
    },
    author: {
        type: String, 
        required: [true, 'Author name is required']
    },
    content: {
        type: String, 
        required: [true, 'Content is required'], 
        minLength: [10, 'content should have atleast 10 characters']
    }
},
{timestamps: true}
);

//collection name is stories in the database
module.exports = mongoose.model('Story', storySchema);