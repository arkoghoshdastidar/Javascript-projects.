import {onSnake as onSnake, expandSnake as expandSnake} from './snake.js';
let food = { x:1, y:1};
export let ate = false;

function generateFood() {
    let newX = Math.floor(Math.random()*21+1);
    let newY = Math.floor(Math.random()*21+1);
    food = {x:newX, y:newY};
    if(onSnake(food)){
        generateFood();
    }
}

export function setFood() {
    food = {x:1, y:1};
}

export function update() {
    if(onSnake(food)){
        ate = true;
        expandSnake(food);
        generateFood();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

export function setAte() {
    ate = false;
}