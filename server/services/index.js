const express = require('express');
const path = require('path');
const Router = express();
const { Services } = require('./models');
const { UserModel } = require('./models/schema/user');

const publicPath = path.join(__dirname + '../' + '../' + '../draw/draw.html');

// Router.use(express.static(publicPath));
// const http = require("http").createServer(Router);
// const io = require("socket.io")(http);

// let players = []
// io
//     .of("draw.html")
//     .on("connect", (socket) => {
//         // console.log("new ");
//         players.push(socket)
//         console.log(`${socket.id} has connected.`)
//         socket.emit("welcome", "Have Fun!");

//     socket.on("draw", (data) => {
//         // console.log(data)
//         players.forEach(con => {
//             if(con.id !== socket.id){
//                 // console.log({x: data.x, y: data.y});
//                 io.of("board.html")
//                     return con.emit("ondraw", {x: data.x, y: data.y})
//             }
//         });
//     });

//     socket.on("down", () => {
//         // console.log("down")
//         players.forEach(con => {
//             if(con.id !== socket.id){
//                 // console.log("ondown");
//                 io.of("board.html")
//                     return con.emit("ondown")
//             }
//         })
//     })

//     socket.on("up", () => {
//         // console.log("up")
//         players.forEach(con => {
//             if(con.id !== socket.id){
//                 // console.log("onup");
//                 io.of("board.html")
//                     return con.emit("onup")
//             }
//         })
//     })

//     socket.on("clear", (data) => {
//         players.forEach(con => {
//             if(con.id !== socket.id){
//                 io.of("board.html")
//                     return con.emit("onclear", {w: data.w, h: data.h})
//             }
//         })
//     })

//     socket.on("disconnect", (reason) => {
//         console.log(`${socket.id} has disconnected.`)
//         players = players.filter(con => con.id != socket.id);
//     });
// });

Router.get('/', async (req,res) => {
  res.render('home');
})

Router.get("/register", async (req,res) => {
  res.render('users/register');
});

Router.post('/register', async  (req, res) => {
  try {
    const { userName, password } = req.body;
    const added = await Services.createUserAccount(userName, password);
    return res.json({
      status: true,
      added
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
    res.redirect('createRoom/:userId')
    // return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get('/getUsers', async (req, res) => {
    try {
      const users = await Services.getAllUsers();
      return res.json({
        users: users.map(user => ({
            userKey: user.userKey,
            name: user.name,
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

Router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await Services.getUserInfo(req.params.userId);
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get('/createRoom/:userId', async (req, res) => {
    res.render('createRoom');
});

Router.post('/createRoom/:userId', async  (req, res) => {
  try {
    const roomAdmin = await Services.getUserInfo(req.params.userId);
    const roomLink = await Services.generateRoomLink(req.params.userId);
    const { noOfPlayers, noOfRounds} = req.body;
    const added = await Services.createRoom(roomAdmin, roomLink, noOfPlayers, noOfRounds);
    res.redirect("http://localhost:7000/board.html")
    // return res.json({
    //   status: true,
    //   added
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.get('/board/:roomId', async (req,res) => {
  res.render('board/board');
})

Router.get('/getRoom/:roomId', async (req, res) => {
  try {
    const room = await Services.getRoomInfo(req.params.roomId);
    return res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.put('/joinTeam/:roomId/:teamId/:userId', async (req,res) => {
  try{
    // console.log(req.params)
    const added = await Services.addMember(req.params.roomId, req.params.teamId, req.params.userId);
    // if(req.params.teamId === 'team1'){
    //   res.sendFile(path.join(__dirname, '../', '../views/board.html'))
    // }
    // else{
    //   res.sendFile(path.join(__dirname, '../', '../views/board.html'))
    // }
    return res.json({
      status: true,
      added
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.put('/start/:roomId', async(req,res) => {
  try{

    const room = await Services.getRoomInfo(req.params.roomId);

    // const [noOfRounds, teams] = await Services.getRoundInfo(req.params.roomId);
    // for(let i=0; i<noOfRounds; i++){
    //   const guessers = await Services.getTeamsGuesser(teams);
    //   const phrase = await Services.getPhrase();
    // }
    return res.json({
      status: true,
      room
    });
    // res.sendFile(path.join(__dirname, '../', '../views/board.html'))
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
});

Router.post('/submit', async(req,res) => {
  try{

  } catch (err) {
    console.error(err);
    res.status(500).json('Server error --> ' + err.message);
  }
})
module.exports = Router;
  