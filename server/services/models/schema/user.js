const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rank: Number,
    history: {noOfGamesPlayed: Number, noOfGamesWins: Number}
});

const UserModel = mongoose.model('user', User);

module.exports = {
    UserModel
};