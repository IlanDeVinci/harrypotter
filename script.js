"use strict"



/*const cardData = [
    {
        image: 'images/harry-potter-film-famille-large.jpg',
        title: 'Card 1',
        description: 'Description for Card 1.',
    },
    {
        image: 'images/hermione_granger__hbp_promo__5.webp',
        title: 'Card 2',
        description: 'Description for Card 2.',
    },
    {
        image: 'images/Ron_Weasley_poster.jpg',
        title: 'Card 1',
        description: 'Description for Card 1.',
    },
    {
        image: 'images/Voldemort_Infobox.webp',
        title: 'Card 2',
        description: 'Description for Card 2.',
    },    {
        image: 'images/harry-potter-film-famille-large.jpg',
        title: 'Card 1',
        description: 'Description for Card 1.',
    },
    {
        image: 'images/hermione_granger__hbp_promo__5.webp',
        title: 'Card 2',
        description: 'Description for Card 2.',
    },
    {
        image: 'images/Ron_Weasley_poster.jpg',
        title: 'Card 1',
        description: 'Description for Card 1.',
    },
    {
        image: 'images/Voldemort_Infobox.webp',
        title: 'Card 2',
        description: 'Description for Card 2.',
    },

];

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const imgcardElement = document.createElement('div');
    imgcardElement.classList.add('imgcard');


    const imageElement = document.createElement('img');
    imageElement.classList.add('cardimg');
    imageElement.src = card.image;
    imageElement.alt = card.title;

    const titleElement = document.createElement('h2');
    titleElement.textContent = card.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = card.description;

    cardElement.appendChild(imgcardElement);
    imgcardElement.appendChild(imageElement);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);

    return cardElement;
}
*/
const cardContainer = document.getElementById('cardContainer');

/*
// Function to initialize the cards
function initializeCards() {

    // Loop through the card data and create card elements
    cardData.forEach(card => {
        const cardElement = createCard(card);
        cardContainer.appendChild(cardElement);
    });
}

// Call the initializeCards function when the page loads
window.onload = initializeCards;
*/

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
        const res = await fetch('https://hp-api.onrender.com/api/characters');
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
