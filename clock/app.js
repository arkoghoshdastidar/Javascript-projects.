const hourHand = document.querySelector('.hour');
const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector('.minute');
const numbers = document.querySelectorAll('.number');
let angle = 0;
setInterval(setClock, 1000);
numbers.forEach((number) => {
    number.style.transform = `rotate(${angle+30}deg)`;
    angle += 30;
});
function setClock(){
    let currentDate = new Date();
    let seconds = currentDate.getSeconds();
    let minutes = (currentDate.getMinutes()+seconds/60);
    let hours = (currentDate.getHours()+minutes/60)%12;
    secondHand.style.transform = `rotate(${seconds*6}deg)`;
    minuteHand.style.transform = `rotate(${minutes*6}deg)`;
    hourHand.style.transform = `rotate(${hours*30}deg)`;
}
window.addEventListener('DOMContentLoaded', setClock);