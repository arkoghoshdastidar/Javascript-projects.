import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
let previousTime = 0;

function main(currentTime) {
    let delta = currentTime - previousTime;
    previousTime = currentTime;
    computerPaddle.update(ball.y ,delta);
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    if(isLose()){
        handleLose();
    }
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
    document.documentElement.style.setProperty('--hue', hue+delta*0.005);
    window.requestAnimationFrame(main);
}
 
function handleLose() {
    let rect = ball.rect();
    if(rect.left <= 0){
        computerScore.innerHTML = parseInt(computerScore.innerHTML)+1;
    }else{
        playerScore.innerHTML = parseInt(playerScore.innerHTML)+1;
    }
}

function isLose() {
    let rect = ball.rect();
    return (rect.left <= 0 || rect.right >= window.innerWidth);
}

document.addEventListener('mousemove', (e) => {
    playerPaddle.position = (e.clientY/innerHeight)*100;
});

window.requestAnimationFrame(main);