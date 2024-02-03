const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const authenticateToken = require("../authenticateToken");

router.get('/', async (req, res) => {
    res.send('comments');
});

router.get('/all', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({message: err})
    }
});

router.get('/onPost/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.postId});
        res.json(comments);
    } catch (err) {
        res.json({message: err});
    }
});


router.post('/create', authenticateToken, (req, res) => {
    if (req.body.body == null || req.body.body === "") {
        res.status(400).json({message: "Comment must have a body"});
        return;
    }

    const comment = new Comment({
        user: req.user,
        body: req.body.body,
        postId: req.body.postId,
        rootCommentId: req.body.rootCommentId,
        parentCommentId: req.body.parentCommentId
    });

    comment.save()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.json({message: err})
    });
});

router.patch('/upvote/:id', authenticateToken, async (req, res) => {

    const user = await User.findOne({username: req.user});

    const vote = user.commentVotes.get(req.params.id);

    // no vote/downvote -> increment by 1
    let postChange = 1;
    let userChange = 1;

    // already upvoted -> remove vote
    if (vote === 1) {
        postChange = -1;
        userChange = 0;
    }
    
    try {
        // update post upvotes count
        const updatedPost = await Comment.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { "upvotes": postChange } },
            { new: true }
        );

        let updatedPost2;
        // remove downvote if necessary
        if (vote === -1) {
            updatedPost2 = await Comment.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { "downvotes": -1 } },
                { new: true }
            );
        }

        //update upvotes on user
        const updatedUser = await updateUserVotes(req.user, req.params.id, userChange, vote);

        res.status(200).json({
            "updatedPost": updatedPost2 || updatedPost,
            "updatedUser": updatedUser
        });
    } catch (err) {
        res.json({message: err})
    }
});

router.patch('/downvote/:id', authenticateToken, async (req, res) => {

    const user = await User.findOne({username: req.user});

    const vote = user.commentVotes.get(req.params.id);

    // no vote/upvote -> increment by 1
    let postChange = 1;
    let userChange = -1;

    // already downvoted -> remove vote
    if (vote === -1) {
        postChange = -1;
        userChange = 0;
    }
    
    try {
        // update post downvotes count
        const updatedPost = await Comment.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { "downvotes": postChange } },
            { new: true }
        );

        let updatedPost2;
        // remove upvote if necessary
        if (vote === 1) {
            updatedPost2 = await Comment.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { "upvotes": -1 } },
                { new: true }
            );
        }

        //update upvotes on user
        const updatedUser = await updateUserVotes(req.user, req.params.id, userChange, vote);

        res.status(200).json({
            "updatedPost": updatedPost2 || updatedPost,
            "updatedUser": updatedUser
        });
    } catch (err) {
        res.status(400).json({message: err})
    }
});

const updateUserVotes = async (username, commentId, newVote, ogVote) => {
    let updatedUser;
    // user hasn't voted on post
    if (ogVote == null) {
        updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { [`commentVotes.${commentId}`]: newVote } },
            { new: true }
        );
    } else { // update vote count on user
        updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { [`commentVotes.${commentId}`]: newVote } },
            { new: true }
        );
    }
    
    return updatedUser;
}


module.exports = router;
