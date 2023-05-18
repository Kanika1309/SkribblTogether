const mongoose = require('mongoose');

const Team = new mongoose.Schema({
    teamKey: {type: String, required: true, unique: true},
    noOfMembers: {type: Number, required: true},
    members: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    // teamTotalScore: Number
});

const TeamModel = mongoose.model('team', Team);

module.exports = {
    TeamModel
};