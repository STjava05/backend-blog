const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    
    title: {
        type: String,
        
    },
    text: {
        type: String,
       
    },
    image: {
        type: String,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,

    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    }],
},
{timestamps: true,strick: true}
);
module.exports = mongoose.model('Post', PostSchema, 'posts');

