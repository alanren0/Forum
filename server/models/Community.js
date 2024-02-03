const mongoose = require('mongoose');

const CommunitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Community', CommunitySchema);