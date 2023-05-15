const express = require('express');
const path = require('path');
const Router = express();
const { Services } = require('./models');

Router.use(express.json({  extended: true }));
Router.use(express.urlencoded({  extended: true }));

// const publicPath = path.join(__dirname + '../' + '../' + '../draw/draw.html');

Router.get('/', async (req,res) => {
  try {
    // console.log("hiiii")
    res.render('home', {check: false, id: ""});
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
})

Router.get("/register", async (req,res) => {
  res.render('users/register');
});

Router.post('/register', async  (req, res) => {
  try {
    const { userName, password } = req.body;
    await Services.createUserAccount(userName, password);
    const user = await Services.getUserInfo(userName);
    res.redirect(`/api/${user._id}`);
    // return res.json({
    //   status: true,
    //   users
    // });
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
    const { userName, password } = req.body;
    const user = await Services.getUserInfo(userName);
    // console.log(user)
    res.redirect(`/api/${user._id}`);
    // return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get("/logout", async (req,res) => {
  try {
    res.redirect('/api/');
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
})

Router.get('/:userId', async (req,res) => {
  // console.log(req.params)
  res.render('home', {check: true, id: req.params.userId});
})

Router.get('/createRoom/:userId', async (req, res) => {
    // console.log(req.params.userId)
    res.render('createRoom', {userId: req.params.userId});
});

Router.post('/createRoom/:userId', async  (req, res) => {
  try {
    const roomAdmin = await Services.getUserInfoById(req.params.userId);
    const roomLink = await Services.generateRoomLink(req.params.userId);
    const { roomName, noOfPlayers, noOfRounds} = req.body;
    const noOfMembers =  noOfPlayers%2 == 0 ? noOfPlayers/2 : Math.floor(noOfPlayers/2)+1;
    let team1 = await Services.createTeam(roomLink+"team1",noOfMembers);
    const team2 = await Services.createTeam(roomLink+"team2",noOfMembers);
    team1 = await Services.addMember(team1, roomAdmin)
    // console.log(team1);
    // console.log(team2);
    const room = await Services.createRoom(roomAdmin, roomLink, roomName, noOfPlayers, noOfRounds, team1, team2);
    console.log(room);
    res.render('team1Board', {team1: team1, phrase: "Barking on the wrong tree", roomAdmin: roomAdmin})
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get('/rooms/:userId', async (req, res) => {
  const rooms = await Services.getRooms();
  // console.log(rooms[0]);
  res.render('room', {userId: req.params.userId, rooms: rooms});
});

Router.get("/joinRoom/:room/:team/:userId", async (req,res) => {
  try {
    const { roomId, teamId , userId } = req.params;
    const user = await Services.getUserInfoById(userId);
    let team = await Services.getTeamInfoById(teamId);
    team = await Services.addMember(team, user);
    res.render('team1Board', {team1: null, phrase: "Barking on the wrong tree", roomAdmin: null})
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