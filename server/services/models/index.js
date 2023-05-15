const express = require('express');
const Router = express();

Router.use(express.json({  extended: true }));
Router.use(express.urlencoded({  extended: true }));

const { UserModel } = require('./schema/user');
const { TeamModel } = require('./schema/team');
const { RoomModel } = require('./schema/room');
const { RoundModel } = require('./schema/round');

// let users= [
//     {
//         userName: "0001",
//         password: "user1",
//         rank: 1,
//         history: {
//             noOfGamesPlayed: 10,
//             noOfGamesWins: 10
//         }
//     },
//     {
//         userName: "0002",
//         password: "user2",
//         rank: 2,
//         history: {
//             noOfGamesPlayed: 10,
//             noOfGamesWins: 9
//         }
//     },
//     {
//         userName: "0003",
//         password: "user3",
//         rank: 3,
//         history: {
//             noOfGamesPlayed: 10,
//             noOfGamesWins: 8
//         }
//     },
//     {
//         userName: "0004",
//         password: "user4",
//         rank: 4,
//         history: {
//             noOfGamesPlayed: 10,
//             noOfGamesWins: 7
//         }
//     },
//     {
//         userName: "0005",
//         password: "user5",
//         rank: 5,
//         history: {
//             noOfGamesPlayed: 10,
//             noOfGamesWins: 6
//         }
//     },
//     {
//         userName: "0006",
//         password: "user6",
//         rank: 6,
//         history: {
//             noOfGamesPlayed: 10,
//             noOfGamesWins: 5
//         }
//     }
// ]

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
        return UserModel.create({
            userName, password
        });
    },
    getAllUsers: () => {
        return UserModel.find();
    },
    getUserInfo: (userName) => {
        // let users = UserModel.find();
        // let id;
        // console.log(users)
        // for(let user : users){
        //     if(user.userName === userName){
        //         id=user._id;
        //         break;
        //     }
        // }
        // console.log(".....")
        // console.log(id)
        return UserModel.findById("64615426af03a42b8dcef52f");
        // return UserModel.findOne({
        //     userName: userName
        // }).lean();
    },
    generateRoomLink: (userName) => {
        return "link"+userName;
    },
    createRoom: (roomAdmin, roomLink, noOfPlayers, noOfRounds) => {
        // const noOfMembers =  noOfPlayers%2 == 0 ? noOfPlayers/2 : noOfPlayers/2+1;
        players = [roomAdmin]
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
            totalScore: 0
        }
        return room
        // return RoomModel.create({
        //     roomAdmin,
        //     roomLink, 
        //     noOfPlayers, 
        //     teams: [(noOfMembers) => {
        //         return TeamModel.create({
        //             noOfMembers, members
        //         });
        //     }], 
        //     noOfRounds,
        //     rounds: [() => {
        //         return RoundModel.create({
        //             phase, roundScore
        //         });
        //     }],
        //     winningTeam
        // });
    },
    getRoomInfo: (roomLink) => {
        // for(let i in rooms){
        //     if(rooms[i].roomLink === roomLink){
        //         return rooms[i]
        //     }
        // }
        return rooms
    },
    addMember: (room, user) => {
        let p = rooms.players
        p.push(user)
        rooms.players=p
        return rooms
        // let member = {}
        // for(let i in users){
        //     if(users[i].userKey === userKey){
        //         member = users[i]
        //     }
        // }
        // for(let i in rooms){
        //     if(rooms[i].roomLink === roomLink){
        //         if(rooms[i].teams[0].members.length < rooms[i].teams[0].noOfMembers && rooms[i].teams[0].teamKey === teamKey){
        //             rooms[i].teams[0].members.push(member);
        //         }else{
        //             rooms[i].teams[1].members.push(member);
        //         }
        //     }
        // }
        return rooms;
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