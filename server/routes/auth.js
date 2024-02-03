const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../models/User');


router.get('/', async (req, res) => {
    res.send('auth');
});

router.get('/all', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.send({message: err});
    }
});

router.post('/signup', async (req, res) => {

    const existsCheck = await User.find({username: req.body.username});

    // checks
    if (existsCheck.length > 0) {
        res.status(400).json({message: "Username already exists"});
        return;
    }

    if (req.body.username == null) {
        res.status(400).json({message: "Username required"});
        return;
    }

    if (req.body.username.length < 1 || req.body.username.length > 20) {
        res.status(400).json({message: "Username must be between 1-20 characters"});
        return;
    }

    if (req.body.password == null) {
        res.status(400).json({message: "Password required"});
        return;
    }

    if (req.body.password.length < 6 || req.body.password.length > 20) {
        res.status(400).json({message: "Username must be between 6-20 characters long"});
        return;
    }

    // create new user
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    //save to db
    newUser.save()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.json({message: err})
    });
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const accessToken = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ 
            accessToken: accessToken,
            user: user
         });
    } else {
        res.status(400).json({message: "username and password do not match"});
    }
});

module.exports = router;
