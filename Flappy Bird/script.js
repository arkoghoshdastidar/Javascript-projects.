import { updateBird, setupBird, getBirdRect } from './bird.js';
import {pipes, updatePipes, setupPipes, removePipe} from './pipe.js';

document.addEventListener('keypress', handleStart, { once: true });
const title = document.querySelector('[data-title]');
let previousTime = 0;
let pipesPassed = 0;

function main(currentTime) {
    if (previousTime === 0) {
        previousTime = currentTime;
        window.requestAnimationFrame(main);
        return;
    }
    let delta = currentTime - previousTime;
    previousTime = currentTime;
    updateBird(delta);
    removePipe();
    updatePipes(delta);
    if (checkLose()) return handleLose();
    window.requestAnimationFrame(main);
}

function handleStart() {
    title.classList.add("hide");
    previousTime = 0;
    pipesPassed = 0;
    setupBird();
    setupPipes();
    window.requestAnimationFrame(main);
}

function checkLose() {
    let bird = getBirdRect();
    let collided = false;
    let outOfScreen = (bird.bottom >= innerHeight || bird.top <= 0);
    pipes.forEach(pipe => {
        let pipeRect = pipe.getBoundingClientRect();
        let topElement = pipe.firstChild.getBoundingClientRect();
        let bottomElement = pipe.lastChild.getBoundingClientRect();
        if(bird.right >= pipeRect.left && (bird.top <= topElement.bottom || bird.bottom >= bottomElement.top) && bird.left <= pipeRect.right){
            collided = true;
        }else{
            pipesPassed += 1;
        }
    });
    return outOfScreen || collided;
}

function handleLose() {
    setTimeout(() => {
        title.classList.remove("hide");
        document.addEventListener('keypress', handleStart, { once: true });
    }, 1000);
}