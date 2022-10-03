const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
});

const User =  mongoose.model('users', UserSchema)
module.exports = User