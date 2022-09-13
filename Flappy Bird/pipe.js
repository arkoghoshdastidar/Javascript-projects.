const HOLE_HEIGHT = 170;
const PIPE_WIDHT = 100;
const PIPE_SPEED = 0.50;
const PIPE_INTERVAL = 1500;
export let pipes = [];
let timeSinceLastPipe = 0;
let passedPipes;

export function removePipe() {
    pipes.forEach(pipe => {
        if(pipe.getBoundingClientRect().right < 0) {
            pipes.shift();
            pipe.remove();
        }
    })
}

export function setupPipes() {
    pipes.forEach(pipe => {
        pipe.remove();
    })
    pipes = [];
    timeSinceLastPipe = 1500;
    passedPipes = 0;
}

export function updatePipes(delta) {
    timeSinceLastPipe += delta;
    if(timeSinceLastPipe >= PIPE_INTERVAL){
        createPipeElement();
        timeSinceLastPipe = 0;
    }

    pipes.forEach(pipe => {
        setLeft(pipe, getLeft(pipe) - delta*PIPE_SPEED);
    });
}

function createPipeElement() {
    const pipe = document.createElement('div');
    const topElement = createSegment('top');
    const bottomElement = createSegment('bottom');
    pipe.appendChild(topElement);
    pipe.appendChild(bottomElement);
    pipe.classList.add('pipe');
    pipe.style.setProperty('--hole-top', numberBetween(HOLE_HEIGHT*1.5, window.innerHeight-HOLE_HEIGHT*1.5));
    setLeft(pipe, window.innerWidth);
    document.body.appendChild(pipe);
    pipes.push(pipe);
}

function createSegment(position) {
    const segment = document.createElement('div');
    segment.classList.add('segment', position);
    return segment;
}

function numberBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setLeft(pipe, value) {
    pipe.style.setProperty('--pipe-left', value);
}

function getLeft(pipe) {
    return parseFloat(getComputedStyle(pipe).getPropertyValue('--pipe-left'));
}