const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const authenticateToken = require("../authenticateToken");
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.send('communities');
});

router.get('/all', async (req, res) => {
    try {
        const allCommunities = await Community.find();
        res.json(allCommunities);
    } catch (err) {
        res.send({message: err});
    }
});

router.get('/count/:count', async (req, res) => {
    try {
        startAt = req.params.count;
        const communities = await Community.find()
                                            .sort('date')
                                            .skip(startAt)
                                            .limit(2);
        res.json(communities);
    } catch (err) {
        res.send({message: err});
    }
});

router.get('/get/:community', async (req, res) => {
    try {
        const community = await Community.findOne({name: req.params.community});
        res.json(community);
    } catch (err) {
        res.send({message: err});
    }
});

router.post('/create', authenticateToken, async (req, res) => {
    try {
        // check for spaces
        if (req.body.name === "" || req.body.name.indexOf(' ') >= 0) {
            console.log("community name must not contain white space and have a length greater than 1");
            res.status(400).json(
                {message: "community name must not contain white space and have a length greater than 1"}
            )
            return;
        }

        // check if community exists already
        const existsCheck = await Community.find({name: req.body.name});

        if (existsCheck.length > 0) {
            console.log("community already exists");
            res.status(400).json(
                {message: "community already exists"}
            )
            return;
        }


        // create new community
        const community = new Community({
            name: req.body.name,
            desc: req.body.desc
        });
    
        // save to db
        community.save()
        .then((data) => {
            console.log("success");
            res.status(200).json(data);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const removedCommunity = await Community.deleteOne({_id: req.params.id});
        res.status(200).json(removedCommunity);
    } catch (err) {
        console.log(err);
        res.json({message:err});
    }
});

module.exports = router;