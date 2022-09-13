import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.getElementById('game-board');

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

setupInput();

function setupInput() {
    window.addEventListener('keydown', handleInput, {once:true});
}

async function handleInput(e) {
    switch(e.key){
        case "ArrowUp":
            if(!canMoveUp()){
                setupInput();
                return;
            }
            await moveUp();
            break;
        case "ArrowDown":
            if(!canMoveDown()){
                setupInput();
                return;
            }
            await moveDown();
            break;
        case "ArrowLeft":
            if(!canMoveLeft()){
                setupInput();
                return;
            }
            await moveLeft();
            break;
        case "ArrowRight":
            if(!canMoveRight()){
                setupInput();
                return;
            }
            await moveRight();
            break;
        default:
            setupInput();
            return;
    }
    grid.handleMergedCells();
    let newTile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = newTile;
    if(!canMoveRight() && !canMoveLeft() && !canMoveUp() && !canMoveDown()){
        newTile.waitForTransition(true).then(() => {
            console.log("Game Over!");
            alert("Game Over!");
        })
        return;
    }
    setupInput();
}

function moveUp() {
    return slideTiles(grid.cellsByColumn);
}

function moveDown() {
    return slideTiles(grid.cellsByColumn.map((group) => {
        return ([...group].reverse());
    }));
}

function moveLeft() {
    return slideTiles(grid.cellsByRow);
}

function moveRight() {
    return slideTiles(grid.cellsByRow.map((group) => {
        return ([...group].reverse());
    }))
}

function slideTiles(cellGrid) {
    return Promise.all(
        cellGrid.flatMap(group => {
        let promises = [];
        for (let i=1; i<group.length; i++) {
            let cell = group[i];
            if(cell.tile == null) continue;
            let lastValidCell = null;
            for(let j=i-1; j>=0; j--) {
                let currentCell = group[j];
                if(!currentCell.canAccept(cell)) break;
                lastValidCell = currentCell;
            }
            if(lastValidCell != null) {
                promises.push(cell.tile.waitForTransition());
                if(lastValidCell.tile != null) {
                    lastValidCell.mergedTile = cell.tile;
                }else{
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        }
        return promises;
    }));
}

function canMoveUp() {
    return canMove(grid.cellsByColumn);
}

function canMoveDown() {
    return canMove(grid.cellsByColumn.map(group => {
        return [...group].reverse();
    }))
}

function canMoveLeft() {
    return canMove(grid.cellsByRow);
}

function canMoveRight() {
    return canMove(grid.cellsByRow.map(group => {
        return [...group].reverse();
    }))
}

function canMove(cellGrid) {
    return cellGrid.some(group => {
        return group.some((cell, index) => {
            if(index == 0) return false;
            if(cell.tile == null) return false;
            const moveToCell = group[index-1];
            if(moveToCell.canAccept(cell)){
                return true;
            }
            return false;
        })
    });
}