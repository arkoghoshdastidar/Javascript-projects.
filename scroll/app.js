// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************

// ********** close links ************

// ********** fixed navbar ************

// ********** smooth scroll ************
// select links

let date = document.querySelector('.date');
date.innerHTML = new Date().getFullYear();
const toggleBtn = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
toggleBtn.addEventListener('click', ()=>{
    // getBoundingClientRect() method returns the height width left right position of an html elemnent.
    let linksContainerHeight = linksContainer.getBoundingClientRect().height;
    if(linksContainerHeight === 0){
        linksContainer.style.height = `${links.getBoundingClientRect().height}px`;
    }else{
        linksContainer.style.height = 0;
    }
});

const navbar = document.getElementById('nav');
const navbarHeigth = navbar.getBoundingClientRect().height;
window.addEventListener('scroll', ()=>{
    // window.pageYOffset calculates the vertical distance traversed by scrolling.
    if(window.pageYOffset > navbarHeigth){
        navbar.classList.add('fixed-nav');
    }else{
        navbar.classList.remove('fixed-nav');
    }
    if(window.pageYOffset > 500){
        document.getElementsByClassName('top-link')[0].classList.add('show-link');
    }else{
        document.getElementsByClassName('top-link')[0].classList.remove('show-link');
    }
});

const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link)=>{
    link.addEventListener('click', (e)=>{
        // preventDefault prevents the default behaviour of an event.
        e.preventDefault();
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        const topHeight = element.offsetTop-navbarHeigth;
        window.scrollTo({
            left: 0,
            top: topHeight
        });
        linksContainer.style.height = 0;
    });
});