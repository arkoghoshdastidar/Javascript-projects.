const keys = document.querySelectorAll('.key');
keys.forEach((key)=>{
    key.addEventListener("click", ()=>{
        const id = key.dataset.note;
        document.getElementById(id).play();
    });
});