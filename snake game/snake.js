import { getInputDirection } from "./input.js";
import { ate, setAte, setFood } from './food.js';
import {resetInput} from './input.js';
export let SNAKE_SPEED = 4;

export function increaseSpeed(){
    SNAKE_SPEED++;
}

export let snakeBody = [
                   {x:11, y:11}
                  ];

export function onSnake(food) {
    return snakeBody.some((segment) => {
        return equals(food, segment);
    });
}

function equals(food, segment) {
    return (food.x === segment.x && food.y === segment.y);
}

export function expandSnake(food){
    snakeBody.unshift(food);
    document.querySelector('.food').classList.remove('food');
}

function gameEnd() {
    alert('Game Over!');
    snakeBody = [
        {x:11, y:11}
    ];
    SNAKE_SPEED = 4;
    setFood();
    resetInput();
}

export function check() {
    if(snakeBody[0].x < 0 || snakeBody[0].y < 0 || snakeBody[0].x > 21 || snakeBody[0].y > 21){
       gameEnd();
    }
    for(let i=1; i<snakeBody.length; i++){
        if(!ate && snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y){
            gameEnd();
        }
    }
    setAte(); 
}

export function update(){
    const inputDirection = getInputDirection();
    for(let i=snakeBody.length-2; i>=0; i--){
        snakeBody[i+1] = {...snakeBody[i]};
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard){
    gameBoard.innerHTML = '';
    snakeBody.forEach((segment) => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        gameBoard.appendChild(snakeElement);
    });
}