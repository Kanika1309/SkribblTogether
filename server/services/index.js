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
    if (!user || user.password !== password) {
      return res.redirect('/api/login');
    }
    // console.log(user)
    res.redirect(`/api/${user._id}`);
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
    const roomPassword = await Services.generatePassword(req.params.userId);
    const { roomName, noOfPlayers, noOfRounds} = req.body;
    const noOfMembers =  noOfPlayers%2 == 0 ? noOfPlayers/2 : Math.floor(noOfPlayers/2)+1;
    let team1 = await Services.createTeam(noOfMembers);
    const team2 = await Services.createTeam(noOfMembers);
    team1 = await Services.addMember(team1, roomAdmin);
    const room = await Services.createRoom(roomAdmin, roomPassword, roomName, noOfPlayers, noOfRounds, team1, team2);
    const teamMembers = await Services.getTeamMembers(team1.members);
    res.render('team1Board', {team: teamMembers, user: roomAdmin, phrase: "Barking on the wrong tree", roomAdmin: roomAdmin, roomName: room.roomName, roomPassword: room.roomPassword, roomId: room._id});
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get('/rooms/:userId', async (req, res) => {
  const rooms = await Services.getRooms();
  // console.log(rooms);
  // console.log(rooms[0].teams[0]);
  res.render('room', {userId: req.params.userId, rooms: rooms});
});

Router.post("/joinRoom/:roomId/:teamId/:userId", async (req,res) => {
  try {
    const { roomId, teamId , userId } = req.params;
    const { roomPassword } = req.body;
    // console.log(req.body);
    const room = await Services.getRoomInfoById(roomId);
    // console.log(room.roomPassword)
    // console.log(roomPassword)
    if (!room || room.roomPassword !== roomPassword) {
      return res.redirect(`/api/rooms/${userId}`);
    }
    const user = await Services.getUserInfoById(userId);
    let team = await Services.getTeamInfoById(teamId);
    // console.log(team)
    team = await Services.addMember(team, user);
    const teamMembers = await Services.getTeamMembers(team.members);
    // console.log(team)
    // console.log(teamMembers)
    res.render('team1Board', {team: teamMembers, user: user, phrase: "Barking on the wrong tree", roomAdmin: null, roomName: room.roomName, roomPassword: room.roomPassword, roomId: room._id})
  } catch (err) {
    console.error(err);
    // res.status(500).json('Server error --> ' + err.message);
  }
});

Router.post('/submit/:roomId/:userId', async(req,res) => {
  try{
    const { roomId, userId} = req.params;
    const room = await Services.getRoomInfoById(roomId);
    // console.log(room)
    if(room!= null && userId == room.roomAdmin){
      await Services.updateRooms(roomId, room.teams[0], room.teams[1]);
    }
    res.redirect(`/api/${userId}`);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
})

module.exports = Router;

// Router.get('/getUsers', async (req, res) => {
//   try {
//     const users = await Services.getAllUsers();
//     return res.json({
//       users: users.map(user => ({
//           userName: user.userName,
//           password: user.password,
//           rank: user.rank,
//           history: {
//             noOfGamesPlayed: user.history.noOfGamesPlayed,
//             noOfGamesWins: user.history.noOfGamesWins,
//           }
//       }))
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json('Server error --> ' + err.message);
//   }
// });

// Router.get('/profile/:userId', async (req, res) => {
// try {
//   const user = await Services.getUserInfo(req.params.userId);
//   return res.json(user);
// } catch (err) {
//   console.error(err);
//   res.status(500).json('Server error --> ' + err.message);
// }
// });
