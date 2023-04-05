const mongoose = require('mongoose');

const Room = new mongoose.Schema({
    roomAdmin: { 
        type: String,
        ref: 'user'
    },
    roomLink: { type: String, required: true, unique: true },
    noOfPlayers: { type: Number, required: true},
    noOfRounds: { type: Number, required: true},
    players: [{
        type: String,
        ref: 'user'
    }],
    // teams: [{ 
    //     type: String,
    //     ref: 'team'
    // }],
    // rounds: [{
    //     type: String,
    //     ref: 'round'
    // }],
    totalScore: Number
    // winningTeam: {
    //     type: String,
    //     ref: 'team'
    // }
});

const RoomModel = mongoose.model('room', Room);

module.exports = {
    RoomModel
};
