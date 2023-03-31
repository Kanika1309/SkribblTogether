let room = io.connect("http://localhost:7000/room");

room.on("welcome", (data) => {
    console.log("received: ", data);
})

room.emit("joinTeam", "team1")

room.on("newUser", (res) =>{
    console.log(res);
})

room.on("err", (err) => {
    console.log(err);
})

room.on("success", (res) => {
    console.log(res);
})