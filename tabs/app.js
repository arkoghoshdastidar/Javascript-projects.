const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');
btns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        btns.forEach((x)=>{
            x.classList.remove('active');
            if(e.currentTarget.dataset.id === x.dataset.id){
                x.classList.add('active');
            }
        })
        articles.forEach((x)=>{
            x.classList.remove('active');
        });
        document.getElementById(e.currentTarget.dataset.id).classList.add('active');
    });
});