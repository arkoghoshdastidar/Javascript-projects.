const birdElement = document.querySelector('[data-bird]');
const BIRD_SPEED = 0.4;
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function updateBird(delta) {
    let top; 
    if(timeSinceLastJump < JUMP_DURATION) {
       top = getTop()-BIRD_SPEED*delta;
    }else {
        top = getTop()+BIRD_SPEED*delta;
    }
    timeSinceLastJump += delta;
    setTop(top);
}

export function getBirdRect() {
    return birdElement.getBoundingClientRect();
}

export function setupBird() {
    setTop(window.innerHeight/2);
    window.removeEventListener('keydown', handleJump);
    window.addEventListener('keydown', handleJump);
}

function getTop() {
    return parseFloat(getComputedStyle(birdElement).getPropertyValue('--bird-top'));
}

function setTop(top) {
    birdElement.style.setProperty('--bird-top', top);
}

function handleJump(e) {
    if(e.code !== "Space") return;
    timeSinceLastJump = 0;
}