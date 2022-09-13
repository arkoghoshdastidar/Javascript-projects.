export default class Tile{
    #tileElement;
    #x;
    #value;
    #y;
    constructor(gameBoard, value = (Math.random()>0.5)?2:4){
        this.#tileElement = document.createElement('div');
        this.#tileElement.classList.add('tile');
        this.value = value;
        gameBoard.appendChild(this.#tileElement);
    }

    waitForTransition(animation = false) {
        return new Promise(resolve => {
            this.#tileElement.addEventListener(animation ? 'animationend ' :'transitionend', resolve, {once: true});
        })
    }

    get tileElement() {
        return this.#tileElement;
    }

    get value() {
        return this.#value;
    }

    set value(v) {
        this.#value = v;
        this.#tileElement.innerHTML = v;
        const power = Math.log2(v);
        const backgroundLightness = 100 - 9*power;
        this.#tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`);
        this.#tileElement.style.setProperty('--text-lightness', `${(backgroundLightness <= 50) ? 90 : 10}%`);
    }

    set x(value) {
        this.#x = value;
        this.#tileElement.style.setProperty('--x', value);
    }

    set y(value) {
        this.#y = value;
        this.#tileElement.style.setProperty('--y', value);
    }
}