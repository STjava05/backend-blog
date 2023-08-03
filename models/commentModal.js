const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
    
    content: {
        type: String,
        
    },
    rate: {
        type: String,
       
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
    
},
{timestamps: true,strick: true}
);
module.exports= mongoose.model('Comment', CommentSchema, 'comments');