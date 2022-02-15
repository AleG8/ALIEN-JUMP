import {Doodle, Platform} from '/scripts/class.js';

const bodyTag = document.querySelector("body");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let myDoodle = new Doodle(100, canvas.height - 75, 50, 60, 'lightgreen');
let gravity = 0.35;
let bounceVelocity = -9.4;
let myPlatforms = new Platform(5);
let raf;
let keydown = false;
let gameOver = false;
let countScore = 0;

function backgroundStyle(){
    let fragment = document.createDocumentFragment();
    for(let i = 0; i < 100; i++){
        let iTag = document.createElement("i");

        Object.assign(iTag.style, {
            backgroundColor: `rgba(255, 255, 255, ${Math.random()})`,
            width: (Math.random() * 5) + "px",
            height: (Math.random() * 5) + "px",
            borderRadius: '50%',
            left: `${Math.random() * screen.width}px`,
            top: `${Math.random() * screen.height}px`
        });

        fragment.appendChild(iTag);
    };
    bodyTag.appendChild(fragment)
}

function setupGame(){
    //background
    backgroundStyle();
    //Setud platform
    myPlatforms.createPlatform(ctx);
    //Start doodle position
    let [startX, startY] = myPlatforms.platformPositions[
        myPlatforms.platformPositions.length - 1
    ]
    Object.assign(myDoodle, {
        x: startX + 15,
        y: startY - (myDoodle.height + 10)
    });
    myDoodle.draw(ctx);
    //Instruction
    ctx.font = "25px serif" 
    ctx.fillText(`Click to start`, (canvas.width / 3) , 75);
}

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height * 2);

    myDoodle.vy += gravity;
    myDoodle.y += myDoodle.vy;

    //Move platform if the doodle is in the middle of the screem
    if(myDoodle.y < canvas.height / 2 && myDoodle.vy < 0){
        myPlatforms.platformPositions.forEach(platform =>{
            platform[1] += -(myDoodle.vy - 4);
        });
        //Adding a new platform at the top of the screem
        if(
            // [1] = y position
            myPlatforms.platformPositions[
                myPlatforms.platformPositions.length - 1
            ][1] > canvas.height + 120
        ){
            let [x, y] = myPlatforms.randomPositions(0)
            myPlatforms.platformPositions.unshift([x,y]);
            myPlatforms.platformPositions.pop();
        }
    }

    myPlatforms.platformPositions.forEach(platform =>{
        let [platfomX, platfomY] = platform;
        //Draw platform
        ctx.fillStyle = myPlatforms.color;
        ctx.fillRect(platfomX, platfomY, myPlatforms.width, myPlatforms.height);
        //doodle collision
        if(
            //doodle is falling
            myDoodle.vy > 0 &&
            myDoodle.x <  platfomX + myPlatforms.width &&
            myDoodle.x + myDoodle.width >  platfomX &&
            myDoodle.y < platfomY + myPlatforms.height &&
            myDoodle.y + myDoodle.height > platfomY &&
            !gameOver
        ){
            myDoodle.vy = bounceVelocity;
            countScore++
        }
    });

    // make doodle wrap the screen
    if (myDoodle.x + myDoodle.width < 0) {
        myDoodle.x = canvas.width;
    }
    else if (myDoodle.x > canvas.width) {
        myDoodle.x = -myDoodle.width;
    }

    //doodle keys
    if(keydown){
        myDoodle.x += myDoodle.vx;
    }

    //Check if the doodle is off the screem
    if(myDoodle.y + myDoodle.height > canvas.height){
        ctx.fillStyle = "red";
        ctx.font = "40px serif" 
        ctx.fillText("Game Over", (canvas.width / 4) , 40);
        //Finish game
        gameOver = true;
        raf = window.cancelAnimationFrame(raf);
    }
    
    myDoodle.draw(ctx);
    //Score
    ctx.font = "25px serif" 
    ctx.fillText(`Score: ${countScore}`, (canvas.width / 2.5) , 75);
  
    raf = window.requestAnimationFrame(gameLoop);
}

//Listeners
canvas.addEventListener("click", ()=>{
    raf = window.requestAnimationFrame(gameLoop);
});

document.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowRight"){
        keydown = true;
        myDoodle.vx = 3;
    }

    if(e.key === "ArrowLeft"){
        keydown = true;
        myDoodle.vx = -3;
    }
});

document.addEventListener("keydup", (e)=>{
    keydown = false;
});

document.addEventListener("DOMContentLoaded", ()=>{
    setupGame();
});
