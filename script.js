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
            <img class ="cardimg" src="${character.image}"></img>
            </div>
            <h2>${character.name}</h2>
            <h3>House: ${character.house}</h3>
            <h3>Actor: ${character.actor}</h3>
            </div>
        `;
    }
}})
    .join('');
    cardContainer.innerHTML = htmlString;
};

loadCharacters();1
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
