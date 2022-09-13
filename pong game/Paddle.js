let COMPUTER_PADDLE_SPEED = 0.25;

export default class Paddle{
    constructor(paddleElement) {
        this.paddle = paddleElement;
        this.reset();
    }

    reset() {
        this.position = 50;
    }

    rect() {
        return this.paddle.getBoundingClientRect();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddle).getPropertyValue('--position'));
    }

    set position(value) {
        this.paddle.style.setProperty('--position', value);
    }

    update(ballHeight, delta) {
        this.position += (COMPUTER_PADDLE_SPEED*delta*(ballHeight - this.position)/window.innerHeight)*100;
    }
};