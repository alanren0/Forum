const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    postVotes: {
        type: mongoose.Schema.Types.Map,
        of: Number,
        default: {}
    },
    commentVotes: {
        type: mongoose.Schema.Types.Map,
        of: Number,
        default: {}
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);