"use strict"



let modal = document.getElementById("modal");
//on récupère le bouton pour faire apparaître le modal
document.getElementById("floating-button").addEventListener("click", function() {
    modal.style.display = "block";
})

//le modal disparaît si on clique sur la croix
document.querySelector("span").addEventListener("click", function() {
    modal.style.display = "none";
})

//le modal disparaît si on clique en dehors
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//on récupère le menu burger pour les petits écrans
const burgerIcon = document.getElementById("burgericon");
const menu = document.getElementById('menu');
//on récupère le menu burger pour les petits écrans

burgerIcon.addEventListener('click', function() {
    //quand on clique sur le burger, ça ajoute/retire des classes pour faire apparaître/disparaître le menu
    burgerIcon.classList.toggle('menuout');
    menu.classList.toggle('active');
    document.getElementById("home").classList.toggle('hide');
    document.getElementById("mycards").classList.toggle('hide');
    document.getElementById("archive").classList.toggle('hide');
})

//animation de l'image 3d
const card = document.querySelector('.containfront');
card.addEventListener('mousemove', rotate); //lance une fonction quand la souris bouge
card.addEventListener('mouseout', stopRotate); //lance une fonction quand la souris sors de l'image  

//fait tourner l'image en fonction de la position de la souris
function rotate(e) {
    const cardItem = this.querySelector('.frontimage');
    const halfWidth = cardItem.offsetWidth / 2;
    //ajoute en style css à l'image une rotation X et une rotation Y en degrés en fonction de la position de la souris par rapport à l'image
    cardItem.style.transform = 'rotateX(' + -(e.offsetY - halfWidth) / 25 + 'deg) rotateY(' + (e.offsetX - halfWidth) / 25 + 'deg)';
}

//remet la rotation de l'image à 0
function stopRotate() {
    const cardItem = this.querySelector('.frontimage');
    cardItem.style.transform = 'rotate(0)';
}