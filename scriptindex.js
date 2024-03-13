"use strict"


let modal = document.getElementById("modal");

document.getElementById("floating-button").addEventListener("click", function(){
    modal.style.display = "block";
})

document.querySelector("span").addEventListener("click", function(){
    modal.style.display = "none";
})

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  
const burgerIcon =document.getElementById("burgericon");
const menu = document.getElementById('menu');

burgerIcon.addEventListener('click', function() {
burgerIcon.classList.toggle('menuout');
menu.classList.toggle('active');
document.getElementById("home").classList.toggle('hide');
document.getElementById("mycards").classList.toggle('hide');
document.getElementById("archive").classList.toggle('hide');
})
