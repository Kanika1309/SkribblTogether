const canvas = document.getElementById('drawing-board');
            const inputOption = document.getElementById('inputOption');
            const phrase = document.querySelector('.phrase');
            const clear = document.querySelector('#clear');
            const guessLabel = document.querySelector('#guessLabel');
            const guess = document.querySelector('#guess');
            const start = document.querySelector('#start');
            const submit = document.querySelector('#submit');
            const member = document.querySelector('#member');
            const timer = document.querySelector('#timer');

            const canvasOffsetX = canvas.offsetLeft;
            const canvasOffsetY = canvas.offsetTop;
            canvas.width = window.innerWidth - canvasOffsetX;
            canvas.height = window.innerHeight - canvasOffsetY;
            // var io = require("socket.io-client");
            var io = io.connect();

            const ctx = canvas.getContext('2d');

            let isPainting = false;
            let lineWidth = 5;
            let startX;
            let startY;

            io.on("timer",(data) => {
                alert(data.msg);
                var timeLeft = 30;
                var timerId = setInterval(countdown, 1000);
                function countdown() {
                    if (timeLeft == 0) {
                        clearTimeout(timerId);
                        timer.innerHTML = 'Time Over';
                        // io.emit("submit",{})
                    } else {
                        // if(timeLeft<=30 && timeLeft>20){
                        // }
                        if(timeLeft < 10) {
                            timeLeft = 0 + '' + timeLeft;
                        }
                            
                        timer.innerHTML = '00:' + timeLeft;
                            
                        timeLeft -= 1;
                    }
                }
            })
            // io.on("onsubmit", (data) => {
            //     alert(data)
            // })
            io.on("onclear", ({w, h}) => {
                ctx.clearRect(0, 0, w, h);
            })
            io.on("start", (data) => {
                // alert(data);
                phrase.style.display="block";
                clear.style.display="inline-block";
                timer.style.display="inline-block";
                canvas.style.pointerEvents="auto";
                // canvas.style.cursor="default";
            })
            io.on("self", () => {
                start.style.display="none";
                guessLabel.style.display="inline-block";
                guess.style.display="inline-block";
                submit.style.display="inline-block";
            })
            io.on("turn", (data) => {
                alert(data.msg)
                // member.style.color= "darkcyan";
                // member.style.color= "black";
                // io.emit("onturn",{})
            })
            inputOption.addEventListener('click', e => {
                if (e.target.id === 'clear') {
                    w = canvas.width;
                    h =  canvas.height;
                    io.emit("clear", { w, h });
                    ctx.clearRect(0, 0, w, h);
                }
                if (e.target.id === 'start') {
                    io.emit("start", {})
                }
            });

            // io.on("ondown", () => {
            //     isPainting = true;
            //     // console.log("on2down")
            // })

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

                x = e.clientX;
                y = e.clientY;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';

                io.emit("draw", { x, y});
                ctx.lineTo(x, y);
                ctx.stroke();
            });