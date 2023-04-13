const express = require('express');
const path = require('path');
const Router = express();
const { Services } = require('./models');
const { UserModel } = require('./models/schema/user');

const publicPath = path.join(__dirname + '../' + '../' + '../draw/draw.html');

Router.get('/', async (req,res) => {
  res.render('home');
})

Router.get("/register", async (req,res) => {
  res.render('users/register');
});

Router.post('/register', async  (req, res) => {
  try {
    const { userName, password } = req.body;
    const users = await Services.createUserAccount(userName, password);
    // res.render('home');
    return res.json({
      status: true,
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get("/login", async (req,res) => {
    res.render('users/login');
});

Router.post("/login", async (req,res) => {
  try {
    // const { userId } = req.body.userId;
    // const user = await Services.getUserInfo(userId);
    res.render('home');
    // return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get("/logout", async (req,res) => {
  try {
    res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
})

Router.get('/createRoom/:userId', async (req, res) => {
    res.render('createRoom');
});

Router.post('/createRoom/:userId', async  (req, res) => {
  try {
    let roomAdmin = await Services.getUserInfo(req.params.userId);
    const roomLink = await Services.generateRoomLink(req.params.userId);
    const { noOfPlayers, noOfRounds} = req.body;
    const room = await Services.createRoom(roomAdmin, roomLink, noOfPlayers, noOfRounds);
    roomAdmin = {
      userName: "0001",
      password: "user1",
      rank: 1,
      history: {
          noOfGamesPlayed: 10,
          noOfGamesWins: 10
      }
    },
    res.render('board', {noOfPlayers : 5, phrase: "Barking on the wrong tree", roomAdmin: roomAdmin})
    // return res.json({
    //   status: true,
    //   added
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get("/joinRoom/:roomLink/:userId", async (req,res) => {
  try {
    let user = await Services.getUserInfo(req.params.userId);
    let room = await Services.getRoomInfo(req.params.roomLink);
    let updatedRoom = await Services.addMember(room, user);
    res.render('board', {noOfPlayers : 5, phrase: "Barking on the wrong tree", roomAdmin: null})
    // return res.json({
    //   status: true,
    //   updatedRoom
    // });
  } catch (err) {
    console.error(err);
    // res.status(500).json('Server error --> ' + err.message);
  }
});

Router.post('/submit', async(req,res) => {
  try{
    // const { result } = req.body.result;
    res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
})

module.exports = Router;

Router.get('/getUsers', async (req, res) => {
  try {
    const users = await Services.getAllUsers();
    return res.json({
      users: users.map(user => ({
          userName: user.userName,
          password: user.password,
          rank: user.rank,
          history: {
            noOfGamesPlayed: user.history.noOfGamesPlayed,
            noOfGamesWins: user.history.noOfGamesWins,
          }
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

// Router.get('/profile/:userId', async (req, res) => {
// try {
//   const user = await Services.getUserInfo(req.params.userId);
//   return res.json(user);
// } catch (err) {
//   console.error(err);
//   res.status(500).json('Server error --> ' + err.message);
// }
// });

// Router.get('/getRoom/:roomId', async (req, res) => {
//   try {
//     const room = await Services.getRoomInfo(req.params.roomId);
//     return res.json(room);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json('Server error --> ' + err.message);
//   }
// });

// Router.get('/joinTeam/:roomId/:teamId/:userId', async (req,res) => {
//   try{
//     // console.log(req.params)
//     const added = await Services.addMember(req.params.roomId, req.params.teamId, req.params.userId);
//     // if(req.params.teamId === 'team1'){
//     //   res.sendFile(path.join(__dirname, '../', '../views/board.html'))
//     // }
//     // else{
//     //   res.sendFile(path.join(__dirname, '../', '../views/board.html'))
//     // }
//     return res.json({
//       status: true,
//       added
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json('Server error --> ' + err.message);
//   }
// });