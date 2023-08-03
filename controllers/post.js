 const Post = require('../models/postModel');
 const commentModel = require('../models/commentModal');
    const authorModel = require('../models/authorModel');
   const mongoose = require('mongoose');
    



const  getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('author')
        .populate('comments')
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate('author')
        .populate('comments')
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const postData = req.body;
    const commentIds = [ ...postData.comments ];
    postData.comments = commentIds

    try {
        const post = new Post(postData);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id: ${_id}`);
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(_id, post, {
        new: true, // Imposta new: true per restituire l'autore aggiornato dopo l'aggiornamento
      });
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }

const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    await Post.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  }

  module.exports = { getAllPost, getOnePost, createPost, updatePost, deletePost} 




