const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    
    category: {
        type: String,
        
    },
    title: {
        type: String,
       
    },
    email: {
        type: String,
    },

    password: {
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
{timestamps: true,strick: true}
);

module.exports = mongoose.model('User', userSchema, 'user');

