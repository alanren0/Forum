const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user: String,
    body: String,
    postId: String,
    rootCommentId: 'String',
    parentCommentId: 'String',
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);