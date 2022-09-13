const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
function getHexCode(){
    let hexCode = "#";
    for(let i=0; i<6; i++){
        let randomNumber = Math.floor(hex.length*Math.random());
        hexCode += hex[randomNumber];
    }
    return hexCode.toUpperCase();
}

const color = document.getElementsByClassName('color');
const btn = document.getElementById('btn');
btn.addEventListener('click', ()=>{
    const hexCode = getHexCode();
    document.body.style.backgroundColor = hexCode;
    color.innerHTML = hexCode;
});