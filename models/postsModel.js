const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    
    category: {
        type: String,
        
    },
    title: {
        type: String,
       
    },
    
    cover: {
        type: String,
       
    },
    readTime: {
       value: {
        type: Number,
    },
    unit: {
        type: String,
      }
    },
    author: {
        name: {
            type: String,

           
        },
        avatar: {
            type: String,

            
        }
    },
    content: {
        type: String,
        
    },
},
{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema, 'posts');

