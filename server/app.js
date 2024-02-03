const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const Post = require('./models/Post');
const Comment = require('./models/Comment');

//Import routes
const postsRoute = require('./routes/posts');
const communitiesRoute = require('./routes/communities');
const commentsRoute = require('./routes/comments')
const authRoute = require('./routes/auth')

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/posts', postsRoute);
app.use('/communities', communitiesRoute);
app.use('/comments', commentsRoute);
app.use('/auth', authRoute);


// get number of Posts
app.get('/', async (req, res) => {
    res.send('We are on home');
});

mongoose.connect(process.env.DB_CONNECTION);

//start server
app.listen(3001);