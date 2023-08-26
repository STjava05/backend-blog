const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

const AuthorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required:true,
  },
  cover: {
    type: String,
  },
  dateOfBirth: {
    type: String,
    
  },
 
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', 
    required: false
  }],
  
}, { timestamps: true, strict: true });
AuthorSchema.pre('save',async function (next) {
  if (!this.isModified('password')) return next()
try{
  
const salt=await bcrypt.genSalt(10)
const  hashedPassword=await bcrypt.hash(this.password,salt)
this.password=hashedPassword
next()
}catch(err){
  return next(err)
}
})
  
module.exports = mongoose.model('Author', AuthorSchema, 'authors');
