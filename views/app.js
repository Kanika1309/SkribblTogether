// const io = require("socket.io-client");
const canvas = document.getElementById('drawing-board');
const clear = document.getElementById('inputOption');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

var io = io.connect("http://localhost:7000/board.html")

const ctx = canvas.getContext('2d');

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

io.on("onclear", ({w, h}) => {
    ctx.clearRect(0, 0, w, h);
})

clear.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        w = canvas.width;
        h =  canvas.height;
        io.emit("clear", { w, h });
        ctx.clearRect(0, 0, w, h);
    }
});

io.on("ondown", () => {
    isPainting = true;
    // console.log("on2down")
})

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    // console.log("down2")
    io.emit("down");
});

io.on("onup", () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    // console.log("onup2")
})

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    // console.log("up2")
    io.emit("up");
    ctx.stroke();
    ctx.beginPath();
});

io.on("ondraw", ({x, y}) => {
    // console.log(x,y)
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
})

canvas.addEventListener('mousemove', (e) => {
    if(!isPainting) {
        return;
    }

    x = e.clientX - canvasOffsetX;
    y = e.clientY;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    io.emit("draw", { x, y});
    ctx.lineTo(x, y);
    ctx.stroke();
});