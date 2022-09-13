const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid{
    #cells //private property of the class Grid.
    constructor(gridElement){
        this.gridElement = gridElement;
        this.gridElement.style.setProperty('--grid-size', GRID_SIZE);
        this.gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
        this.gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index%GRID_SIZE, Math.floor(index / GRID_SIZE));
        });
    }

    handleMergedCells() {
        this.#cells.forEach((cell) => {
            if(cell.mergedTile != null && cell.tile != null){
                cell.tile.value += cell.mergedTile.value;
                this.gridElement.removeChild(cell.mergedTile.tileElement);
                cell.mergedTile = null;
            }
        });
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, [])
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, [])
    }

    get #emptyCells() {
        return this.#cells.filter(cell => {
            return cell.tile == null;
        })
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
        return this.#emptyCells[randomIndex];
    }
};

class Cell {
    #x;
    #y;
    #tile;
    #cellElement;
    #mergedTile;
    constructor(cellElement, x, y){
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get tile() {
        return this.#tile;
    }

    set tile(value) {
        this.#tile = value;
        if(value == null) return;
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }

    get mergedTile() {
        return this.#mergedTile;
    }

    set mergedTile(value) {
        this.#mergedTile = value;
        if(value == null) return;
        this.#mergedTile.x = this.#x;
        this.#mergedTile.y = this.#y;
    }

    canAccept(cell){
        return (this.#tile == null || this.#mergedTile == null && this.tile.value == cell.tile.value);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
};

function createCellElements(gridElement) {
    const cells = [];
    for(let i=0; i<GRID_SIZE**2; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        gridElement.appendChild(cell);
    }
    return cells;
}