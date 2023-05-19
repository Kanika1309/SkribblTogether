const { UserModel } = require('./schema/user');
const { TeamModel } = require('./schema/team');
const { RoomModel } = require('./schema/room');
const { RoundModel } = require('./schema/round');

let phrases = ["Barking on the wrong tree", "Kill two birds with one stone", "Born with a silver spoon in one's mouth"]

const Services = {
    createUserAccount: (userName, password) => {
        return UserModel.create({
            userName, password
        });
    },
    getAllUsers: () => {
        return UserModel.find();
    },
    getUserInfo: (name) => {
        return UserModel.findOne({
            userName: name
        })
    },
    getUserInfoById: (userId) => {
        return UserModel.findById(userId)
    },
    generateRoomLink: (userId) => {
        return userId;
    },
    createTeam: (teamKey, noOfMembers) => {
        let members=[]
        return TeamModel.create({
            teamKey,
            noOfMembers,
            members
        });
    },
    getTeamInfoById: (teamId) => {
        return TeamModel.findById(teamId)
    },
    addMember: (team, user) => {
        // console.log(team);
        // console.log(user)
        // console.log(team.members)
        team.members.push(user);
        const uTeam = team;
        // console.log(uTeam);
        const nTeam = TeamModel.findOneAndUpdate({_id: team._id}, uTeam, {new: true});
        // console.log(nTeam._update);
        return nTeam;
    },
    getTeamMembers: async (members) => {
        // console.log("models")
        // console.log(members)
        let teamMembers = []
        for(let i=0;i<members.length;i++){
            // console.log(members[i])
            teamMembers.push( await Services.getUserInfoById(members[i]));
        }
        // console.log(teamMembers)
        return teamMembers;
    },
    // getMembers: async () => {
    //     const teams = await TeamModel.find();
    //     // console.log(teams)
    //     if(teams.length==0){
    //         return teams;
    //     }
    //     const members = teams[0].members;
    //     const m = await Services.getTeamMembers(members)
    //     console.log(m);
    //     return m;
    // },
    createRoom: (roomAdmin, roomLink, roomName, noOfPlayers, noOfRounds, team1, team2) => {
        return RoomModel.create({
            roomAdmin,
            roomLink,
            roomName, 
            noOfPlayers,
            noOfRounds, 
            teams: [
                team1,
                team2
            ]
        })
    },
    getRooms: () => {
        // const rooms = RoomModel.find();
        // console.log(rooms);
        return RoomModel.find();
    },
    getRoomInfoById: (roomId) => {
        // const room = RoomModel.findById(roomId);
        // console.log(room)
        return RoomModel.findById(roomId);
    },
    updateRoomInfo: () => {
        team.members.push(user)
        return TeamModel.findOneAndUpdate({_id: team.id}, team);
    },
    getPhrase: () => { 
        return phrases[getRndInteger(0,phrases.length)]
    },
    // getTeamsGuesser: (teams) => {
    //     let guessers = []
    //     guessers[0] = teams[0].members[getRndInteger(0,teams[0].members.length)];
    //     guessers[1] = teams[0].members[getRndInteger(0,teams[1].members.length)];
    //     return guessers;
    // },
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min; 
}

module.exports = {
    Services
};