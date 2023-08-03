


const Author = require('../models/authorModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModal');




const getAllAuthor = async (req, res) => {
    try {
        const authors = await Author.find()
        .populate('posts')
        .populate('comments')
        res.status(200).json(authors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOneAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        .populate('posts')
        .populate('comments')
        res.status(200).json(author);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createAuthor = async (req, res) => {
    const authorData = req.body;
    // Supponiamo che i postIds siano un array di ObjectId validi dei post associati all'autore
    const postIds = [ ...authorData.posts ]; // Sostituisci con gli ID dei post reali
   // Aggiungi i postIds all'array posts nell'oggetto authorData
    authorData.posts = postIds

    try {
        const author = new Author(authorData);
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



const updateAuthor = async (req, res) => {
    const { id: _id } = req.params;
    const author = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No author with id: ${_id}`);
  
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(_id, author, {
        new: true, // Imposta new: true per restituire l'autore aggiornato dopo l'aggiornamento
      });
  
      res.status(200).json(updatedAuthor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No author with id: ${id}`);

    await Author.findByIdAndRemove(id);

    res.json({ message: "Author deleted successfully." });
  };


  







module.exports = {getAllAuthor, getOneAuthor, createAuthor, updateAuthor, deleteAuthor};