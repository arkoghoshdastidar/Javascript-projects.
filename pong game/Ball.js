const INITIAL_VELOCITY = 0.055;
const INCREMENT_VELOCITY = 0.000005;

export default class Ball {
    constructor(ballElement) {
        this.ballElement = ballElement;
        this.reset();
        this.velocity = INITIAL_VELOCITY;
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = {x:0, y:0};
        while(Math.abs(this.direction.x) < 0.1 || Math.abs(this.direction.x) > 0.9){
            let angle = (Math.PI*2)*Math.random();
            this.direction.x = Math.cos(angle);
            this.direction.y = Math.sin(angle);
        }
    }

    rect(){
        // element.getBoundingClientRect() returns the top, left, right, bottom, width, height properties of the element.
        return this.ballElement.
        getBoundingClientRect();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'));
    }

    set x(value) {
        this.ballElement.style.setProperty('--x', value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'));
    }

    set y(value) {
        this.ballElement.style.setProperty('--y', value);
    }

    update(delta, paddleRects) {
        this.x += this.velocity*delta*this.direction.x;
        this.y += this.velocity*delta*this.direction.y;
        if(this.velocity + INCREMENT_VELOCITY < Number.POSITIVE_INFINITY){
            this.velocity += INCREMENT_VELOCITY;
        }
        const rect = this.rect();
        if(rect.top <= 0 || rect.bottom > window.innerHeight){
            this.direction.y *= -1;
        }
        if(paddleRects.some(paddle => {
            return (
                rect.bottom >= paddle.top &&
                rect.top <= paddle.bottom &&
                rect.left <= paddle.right &&
                rect.right >= paddle.left
            )
        })){
            this.direction.x *= -1;
        }else if(rect.left <= 0 || rect.right >= window.innerWidth){
            this.direction.x *= -1;
        }
    }
};