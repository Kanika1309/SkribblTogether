const { UserModel } = require('./schema/user');
const { TeamModel } = require('./schema/team');
const { RoomModel } = require('./schema/room');
const { RoundModel } = require('./schema/round');

let users= [
    {
        userName: "0001",
        password: "user1",
        rank: 1,
        history: {
            noOfGamesPlayed: 10,
            noOfGamesWins: 10
        }
    },
    {
        userName: "0002",
        password: "user2",
        rank: 2,
        history: {
            noOfGamesPlayed: 10,
            noOfGamesWins: 9
        }
    },
    {
        userName: "0003",
        password: "user3",
        rank: 3,
        history: {
            noOfGamesPlayed: 10,
            noOfGamesWins: 8
        }
    },
    {
        userName: "0004",
        password: "user4",
        rank: 4,
        history: {
            noOfGamesPlayed: 10,
            noOfGamesWins: 7
        }
    },
    {
        userName: "0005",
        password: "user5",
        rank: 5,
        history: {
            noOfGamesPlayed: 10,
            noOfGamesWins: 6
        }
    },
    {
        userName: "0006",
        password: "user6",
        rank: 6,
        history: {
            noOfGamesPlayed: 10,
            noOfGamesWins: 5
        }
    }
]

let rooms = {
        roomAdmin: {
            userKey: "0001",
            name: "user1",
            rank: 1,
            history: {
                noOfGamesPlayed: 10,
                noOfGamesWins: 10
            }
        },
        roomLink: "link0001",
        noOfPlayers: 10,
        noOfRounds: 3,
        players: [],
        // teams: [
        //     {
        //         teamKey: "team1",
        //         noOfMembers: 5,
        //         members: [
        //             {
        //                 userKey: "0001",
        //                 name: "user1",
        //                 rank: 1,
        //                 history: {
        //                     noOfGamesPlayed: 10,
        //                     noOfGamesWins: 10
        //                 }
        //             }
        //         ],
        //         teamTotalScore: 0
        //     },
        //     {
        //         teamKey: "team2",
        //         noOfMembers: 5,
        //         members: [
        //             {
        //                 userKey: "0002",
        //                 name: "user2",
        //                 rank: 2,
        //                 history: {
        //                     noOfGamesPlayed: 10,
        //                     noOfGamesWins: 9
        //                 }
        //             }
        //         ],
        //         teamTotalScore: 0
        //     }
        // ],
        // rounds: [],
        totalScore: 0
    }

let phrases = ["Barking on the wrong tree", "Kill two birds with one stone", "Born with a silver spoon in one's mouth"]

const Services = {
    createUserAccount: (userName, password) => {
        const add = {
            userName,
            password,
            rank: users.length+1,
            history: {
                noOfGamesPlayed: 0,
                noOfGamesWins: 0
            } 
        }
        users.push(add)
        return {
            users
        }
        // return UserModel.create({
        //     userKey, name, rank, history
        // });
    },
    getAllUsers: () => {
        return users;
        return UserModel.find().lean();
    },
    getUserInfo: (userName) => {
        for(let i in users){
            if(users[i].userName === userName){
                return users[i]
            }
        }
        // return UserModel.findOne({
        //     userName: userName
        // }).lean();
    },
    generateRoomLink: (userKey) => {
        return "link"+userKey;
    },
    createRoom: (roomAdmin, roomLink, noOfPlayers, noOfRounds) => {
        // const noOfMembers =  noOfPlayers%2 == 0 ? noOfPlayers/2 : noOfPlayers/2+1;
        players = [users[0]]
        const room =  {
            roomAdmin,
            roomLink,
            noOfPlayers,
            noOfRounds,
            players: players,
            // teams: [{
            //     teamKey: "team1",
            //     noOfMembers,
            //     members:[],
            //     teamTotalScore: 0
            // },
            // {
            //     teamKey: "team2",
            //     noOfMembers,
            //     members: [],
            //     teamTotalScore: 0
            // }],
            // rounds: [],
            totalScore: 5
        }
        return rooms
        return RoomModel.create({
            roomAdmin,
            roomLink, 
            noOfPlayers, 
            teams: [(noOfMembers) => {
                return TeamModel.create({
                    noOfMembers, members
                });
            }], 
            noOfRounds,
            rounds: [() => {
                return RoundModel.create({
                    phase, roundScore
                });
            }],
            winningTeam
        });
    },
    getRoomInfo: (roomLink) => {
        for(let i in rooms){
            if(rooms[i].roomLink === roomLink){
                return rooms[i]
            }
        }
    },
    addMember: (roomLink, teamKey, userKey) => {
        let member = {}
        for(let i in users){
            if(users[i].userKey === userKey){
                member = users[i]
            }
        }
        for(let i in rooms){
            if(rooms[i].roomLink === roomLink){
                if(rooms[i].teams[0].members.length < rooms[i].teams[0].noOfMembers && rooms[i].teams[0].teamKey === teamKey){
                    rooms[i].teams[0].members.push(member);
                }else{
                    rooms[i].teams[1].members.push(member);
                }
            }
        }
        return rooms;
    },
    getRoundInfo: (roomLink) => {
        for(let i in rooms){
            if(rooms[i].roomLink === roomLink){
                return [rooms[i].noOfRounds, rooms[i].teams];
            }
        }
    },
    getPhrase: () => { 
        return phrases[getRndInteger(0,phrases.length)]
    },
    getTeamsGuesser: (teams) => {
        let guessers = []
        guessers[0] = teams[0].members[getRndInteger(0,teams[0].members.length)];
        guessers[1] = teams[0].members[getRndInteger(0,teams[1].members.length)];
        return guessers;
    },
    play: (teams, guessers, phrase) => { 
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min; 
}

module.exports = {
    Services
};