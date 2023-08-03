const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
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
  dateOfBirth: {
    type: String,
  },
  avatar: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', 
    required: false
  }],
  comments: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', 
    required: false
  }]
}, { timestamps: true, strict: true });

module.exports = mongoose.model('Author', AuthorSchema, 'authors');
