const mongoose = require('mongoose');

const Round = new mongoose.Schema({
    phrase: String,
    guessers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    score: Number
    // {
    //     team1Score: Number,
    //     team2Score: Number
    // }
});

const RoundModel = mongoose.model('round', Round);

module.exports = {
    RoundModel
};