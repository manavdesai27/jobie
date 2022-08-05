const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    text: String,
    creatorUsername: String,
    tweetId: String,
    date: {
        type: Date
    },
    mail: Boolean
});

const Tweet =  mongoose.model('tweets', TweetSchema)

module.exports = Tweet