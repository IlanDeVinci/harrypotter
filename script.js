"use strict"

const cardContainer = document.getElementById('cardContainer');

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

let searchBar = document.getElementById("search");
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpList.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});



let hpCharacters = [];
let hpList = [];
let userList = [];
const loadCharacters = async () => {
        const res = await fetch('https://hp-api.lainocs.fr/characters');
        hpCharacters = await res.json();
        hpCharacters.forEach(element => {
            if(element.image){
                hpList.push(element);
            }
            hpList.forEach(element =>{
                if(element.house==""){
                    element.house = "None";
            }})

        });
        displayCharacters(hpList);
};

const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {
    if(character.house==currentFilter || currentFilter=="none"){
    {
            return `
            <div class="card">
                <div class="imgcard">
                    <a href="single.html?slug=${character.slug}">
                        <img class ="cardimg" src="${character.image}"></img>
                    </a>
                </div>
                <div class="textcard">
                    <h2>${character.name}</h2>
                    <h3>House: ${character.house}</h3>
                    <h3>Actor: ${character.actor}</h3>
                </div>
            </div>
        `;
    }
}})
    .join('');
    cardContainer.innerHTML = htmlString;
    let i = 0;
    document.querySelectorAll(".card").forEach(element => {
        i++
        setTimeout(function fade(){element.classList.add("fade")},50*i);
        ;
    });
}


loadCharacters();
let currentFilter = "none";

function changeTheme(name){
    document.getElementById("nav").classList.toggle(currentFilter);
    document.getElementById("main").classList.toggle(currentFilter);
    document.getElementById("body").classList.toggle(currentFilter);
    if(currentFilter==name){
        currentFilter = "none";
    } else{
    currentFilter = name;
    document.getElementById("nav").classList.toggle(currentFilter);
    document.getElementById("main").classList.toggle(currentFilter);
    document.getElementById("body").classList.toggle(currentFilter);
    }
    displayCharacters(hpList);
}

document.getElementById("Gryffindor").addEventListener("click", function() {
    changeTheme("Gryffindor");
});
document.getElementById("Hufflepuff").addEventListener("click", function() {
    changeTheme("Hufflepuff");
});
document.getElementById("Slytherin").addEventListener("click", function() {
    changeTheme("Slytherin");
});
document.getElementById("Ravenclaw").addEventListener("click", function() {
    changeTheme("Ravenclaw");
});
document.getElementById("None").addEventListener("click", function() {
    changeTheme("None");
});


const burgerIcon =document.getElementById("burgericon");
const menu = document.getElementById('menu');

burgerIcon.addEventListener('click', function() {
burgerIcon.classList.toggle('menuout');
menu.classList.toggle('active');
document.getElementById("home").classList.toggle('hide');
document.getElementById("mycards").classList.toggle('hide');
document.getElementById("archive").classList.toggle('hide');
})