const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
// middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Routes

const commentsRouter = require('./routes/commentRoutes');
const authorsRouter = require('./routes/authorRoutes');
const postsRouter = require('./routes/postRoutes');
const usersRouter = require('./routes/userRoutes');
const { login } = require('./middleware/login');
const { auth } = require('./middleware/auth');
const sendMail = require('./controllers/sendMail');
const github = require('./routes/githubRoute');



app.use('/login', login);
app.use('/images', express.static('images'));

app.use('/comment', auth, commentsRouter);
app.use('/post', auth, postsRouter);
app.use('/author', auth, authorsRouter);
app.use('/user', auth, usersRouter);
app.use('/', sendMail);
app.use('/', github);




app.listen(process.env.PORT || 5051, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5051}`);
}
);

