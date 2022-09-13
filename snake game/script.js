import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeBody, increaseSpeed, check} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';

let snakeLength = 1;
let gameBoard = document.getElementById('game-board');
let lastRenderTime = 0;

function main(currentTime){
    window.requestAnimationFrame(main);
    let secondsSinceLastRender = (currentTime-lastRenderTime)/1000;
    if(secondsSinceLastRender < 1/SNAKE_SPEED){
        return;
    }
    if(snakeBody.length > 2*snakeLength){
        snakeLength = snakeBody.length;
        increaseSpeed(); 
    }
    lastRenderTime = currentTime;
    update();
    check();
    draw(); 
}

window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
}

function draw(){
    drawSnake(gameBoard);
    drawFood(gameBoard);
}