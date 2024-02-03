const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const authenticateToken = require("../authenticateToken");
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.get('/all', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (err) {
        res.send({message: err});
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.send({message: err});
    }
});

router.post('/count/:count', async (req, res) => {
    try {
        let filter = {};
        if (req.body.community) {
            filter = {"community": req.body.community}
        }
        startAt = req.params.count;
        const posts = await Post.find(filter)
                                .sort('date')
                                .skip(startAt)
                                .limit(5);
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/count/:count', async (req, res) => {
    try {
        startAt = req.params.count;
        const posts = await Post.find({})
                                .sort('date')
                                .skip(startAt)
                                .limit(5);
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/create', authenticateToken, (req, res) => {
    if (req.body.title == null || req.body.title == "" ||
        req.body.community == null || req.body.community == "") {
        res.status(400).json({message: "Post must contain atleast a title and community"})
        return;
    }

    const post = new Post({
        title: req.body.title,
        link: req.body.link,
        user: req.user,
        body: req.body.body,
        community: req.body.community
    });

    if (req.body.link == "") {
        post.link = `/community/${post.community}/post/?id=${post._id}`;
    }

    post.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json({message: err})
    });
});

router.patch('/upvote/:postId', authenticateToken, async (req, res) => {

    const user = await User.findOne({username: req.user});

    const vote = user.postVotes.get(req.params.postId);

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
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "upvotes": postChange } },
            { new: true }
        );

        let updatedPost2;
        // remove downvote if necessary
        if (vote === -1) {
            updatedPost2 = await Post.findOneAndUpdate(
                { _id: req.params.postId },
                { $inc: { "downvotes": -1 } },
                { new: true }
            );
        }

        //update upvotes on user
        const updatedUser = await updateUserVotes(req.user, req.params.postId, userChange, vote);

        res.status(200).json({
            "updatedPost": updatedPost2 || updatedPost,
            "updatedUser": updatedUser
        });
    } catch (err) {
        res.json({message: err})
    }
});

router.patch('/downvote/:postId', authenticateToken, async (req, res) => {

    const user = await User.findOne({username: req.user});

    const vote = user.postVotes.get(req.params.postId);

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
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "downvotes": postChange } },
            { new: true }
        );

        let updatedPost2;
        // remove upvote if necessary
        if (vote === 1) {
            updatedPost2 = await Post.findOneAndUpdate(
                { _id: req.params.postId },
                { $inc: { "upvotes": -1 } },
                { new: true }
            );
        }

        //update upvotes on user
        const updatedUser = await updateUserVotes(req.user, req.params.postId, userChange, vote);

        res.status(200).json({
            "updatedPost": updatedPost2 || updatedPost,
            "updatedUser": updatedUser
        });
    } catch (err) {
        res.status(400).json({message: err})
    }
});

const updateUserVotes = async (username, postId, newVote, ogVote) => {
    let updatedUser;
    // user hasn't voted on post
    if (ogVote == null) {
        updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { [`postVotes.${postId}`]: newVote } },
            { new: true }
        );
    } else { // update vote count on user
        updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { [`postVotes.${postId}`]: newVote } },
            { new: true }
        );
    }
    
    return updatedUser;
}


module.exports = router;
