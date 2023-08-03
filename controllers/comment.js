
const Comment = require('../models/commentModal');
const post = require('../models/postModel');
const author = require('../models/authorModel');
const mongoose = require('mongoose');

const getAllComment = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('author')
            
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOneComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('author')
            
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createComment = async (req, res) => {
    const commentData = req.body;
    const authorIds = [...commentData.author];
    commentData.author = authorIds;

    try {
        const comment = new Comment(commentData);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    const { id: _id } = req.params;
    const comment = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No comment with id: ${_id}`);

    try {
        const updateComment = await Comment.findByIdAndUpdate(_id, comment, {
            new: true, // Imposta new: true per restituire l'autore aggiornato dopo l'aggiornamento
        });

        res.status(200).json(updateComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No comment with id: ${_id}`);

    try {
        await Comment.findByIdAndRemove(_id);
        res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });

    }
}




module.exports = { getAllComment, getOneComment, createComment, updateComment, deleteComment };
