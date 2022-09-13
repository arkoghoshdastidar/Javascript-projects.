let inputDirection = { x:0, y:0 };
let previousDirection = { x:0, y:0 };

export function resetInput() {
    inputDirection = { x:0, y:0 };
    previousDirection = { x:0, y:0 };
}

window.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'ArrowUp':
            if(previousDirection.x !== 0) break;
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case 'ArrowDown':
            if(previousDirection.x !== 0) break;
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        case 'ArrowLeft':
            if(previousDirection.y !== 0) break;
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case 'ArrowRight':
            if(previousDirection.y !== 0) break;
            inputDirection.x = 0;
            inputDirection.y = 1;
    }
});

export function getInputDirection() {
    previousDirection = {...inputDirection};
    return inputDirection;
}