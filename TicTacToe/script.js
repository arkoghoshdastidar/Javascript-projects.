const cellElements = document.querySelectorAll('[data-cell]');
const winningMessage = document.querySelector('.winning-message');
const messageText = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const gameBoard = document.getElementById('board');
let circleTurn = true;
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let blocksFree = 9;

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once:true});
});

function handleClick(e) {
    // palceMark
    let cell = e.currentTarget;
    let currentClass;
    let hoverClass;
    if(circleTurn === true) {
        currentClass = CIRCLE_CLASS;
        hoverClass = X_CLASS;
        circleTurn = false;
    }else {
        currentClass = X_CLASS;
        hoverClass = CIRCLE_CLASS;
        circleTurn = true;
    }
    placeMark(cell, currentClass, hoverClass);
    // Check for Win
    if(checkWin(currentClass)){
        console.log("winner");
        restartGame(`${currentClass.toLocaleUpperCase()} Win's`);
    }
    // Check for Draw
    if(checkDraw()){
        console.log('draw');
        restartGame("Draw");
    }
}

function restartGame(message) {
    winningMessage.classList.add('show');
    messageText.textContent = message;
    restartButton.addEventListener('click', handleRestart);
}

function handleRestart() {
    console.log('handlerestart');
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.addEventListener('click', handleClick, {once:true});
    });
    blocksFree = 9;
    circleTurn = true;
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.add(CIRCLE_CLASS);
    messageText.textContent = '';
    winningMessage.classList.remove('show');
}

function checkDraw() {
    return blocksFree === 0;
}

function placeMark(cell, currentClass, hoverClass) {
    blocksFree--;
    cell.classList.add(currentClass);
    gameBoard.classList.remove(currentClass);
    gameBoard.classList.add(hoverClass);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}