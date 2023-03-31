// var sitePath = process.argv[2] || ".";
const port = 7000;
const express = require("express")
const app = express();
// const path = require('path');
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static('views'));
// io.on('connection', function (socket) {
//     socket.emit("welcome","welcome to socket.io");
//     console.log("new cliemt is connected")
// });
// const gameTeams = ["team1","team2"];

// io
//     .of("/room")
//     .on("connection", (socket) => {
//         // console.log("new ");
//         socket.emit("welcome", "welcome to socket.io 2");

//     socket.on("joinTeam", (team) => {
//         if(gameTeams.includes(team)){
//             socket.join(team);
//             // broadcast
//             io
//                 .of("/room")
//                 .in(team).emit("newUser", "New Player Joined: "+ team);
//             return socket.emit("success", "You have successfully joined: " + team);
//         }else {
//             return socket.emit("err", "No team named: " + team);
//         }
//     })
// });
let players = []

io
    .of("board.html")
    .on("connect", (socket) => {
        // console.log("new ");
        players.push(socket)
        console.log(`${socket.id} has connected.`)
        socket.emit("welcome", "Have Fun!");

    socket.on("draw", (data) => {
        // console.log(data)
        players.forEach(con => {
            if(con.id !== socket.id){
                // console.log({x: data.x, y: data.y});
                io.of("board.html")
                    return con.emit("ondraw", {x: data.x, y: data.y})
            }
        });
    });

    socket.on("down", () => {
        // console.log("down")
        players.forEach(con => {
            if(con.id !== socket.id){
                // console.log("ondown");
                io.of("board.html")
                    return con.emit("ondown")
            }
        })
    })

    socket.on("up", () => {
        // console.log("up")
        players.forEach(con => {
            if(con.id !== socket.id){
                // console.log("onup");
                io.of("board.html")
                    return con.emit("onup")
            }
        })
    })

    socket.on("clear", (data) => {
        players.forEach(con => {
            if(con.id !== socket.id){
                io.of("board.html")
                    return con.emit("onclear", {w: data.w, h: data.h})
            }
        })
    })

    socket.on("disconnect", (reason) => {
        console.log(`${socket.id} has disconnected.`)
        players = players.filter(con => con.id != socket.id);
    });
});

app.use(express.json());
app.use('/api', require('./server/'));

// console.log(sitePath);
// console.log("Starting server in: " + __dirname + '/' + sitePath);

http.listen(port, function (res,err) { 
    console.log("Server running at: http://localhost:" + port)
});