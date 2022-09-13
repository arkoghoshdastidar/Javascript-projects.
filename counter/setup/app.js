let increase = document.getElementsByClassName('increase');
let decrease = document.getElementsByClassName('decrease');
let reset = document.getElementsByClassName('reset');
let value = document.getElementById('value');

function setColor(){
    if(parseInt(value.innerHTML) == 0){
        value.style.color = "black";
    }else if(parseInt(value.innerHTML) > 0){
        value.style.color = "green";
    }else{
        value.style.color = "red";
    }
}

increase[0].addEventListener("click", ()=>{
    console.log('clicked');
    value.innerHTML = (parseInt(value.innerHTML)+1).toString();
    setColor();
});

decrease[0].addEventListener("click", ()=>{
    value.innerHTML = (parseInt(value.innerHTML)-1).toString();
    setColor();
});

reset[0].addEventListener("click", ()=>{
    value.innerHTML = "0";
    setColor();
})