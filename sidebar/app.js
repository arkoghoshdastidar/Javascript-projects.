const closeButton = document.getElementsByClassName('close-btn')[0];
const sidebar_toggle = document.getElementsByClassName('sidebar-toggle')[0];

closeButton.addEventListener('click', ()=>{
    document.getElementsByClassName('sidebar')[0].classList.remove('show-sidebar');
});

sidebar_toggle.addEventListener('click', ()=>{
    document.getElementsByClassName('sidebar')[0].classList.add('show-sidebar');
});