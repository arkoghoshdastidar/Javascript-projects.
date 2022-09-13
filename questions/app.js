//using selectors inside the element
// traversing the dom
const plus_icon = document.getElementsByClassName('fa-plus-square');
const minus_icon = document.getElementsByClassName('fa-minus-square');

for(let i=0; i<plus_icon.length; i++){
    plus_icon[i].addEventListener('click', (e)=>{
        let parent = plus_icon[i].parentNode.parentNode.parentNode.parentNode;
        parent.classList.add('show-text');
        for(let j=0; j<plus_icon.length; j++){
            let parent = plus_icon[j].parentNode.parentNode.parentNode.parentNode;
            if(i !== j){
                if(parent.classList.contains('show-text')){
                    parent.classList.remove('show-text');
                }
            }
        }
    });
}

for(let i=0; i<minus_icon.length; i++){
    minus_icon[i].addEventListener('click', ()=>{
        const parent = minus_icon[i].parentNode.parentNode.parentNode.parentNode;
        if(parent.classList.contains('show-text')){
            parent.classList.remove('show-text');
        }
    });
}