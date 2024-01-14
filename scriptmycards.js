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

let userList = [];
let filteredCharacters = [];
let filteredSortedList = [];
let searchString = "";

let searchBar = document.getElementById("search");
searchBar.addEventListener('input', (e) => {
    searchString = e.target.value.toLowerCase();
    filteredCharacters = userList.filter((character) => {
        if(character.house==currentFilter || currentFilter=="none"){
            return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString) && 
            character.house.toLowerCase().includes(currentFilter)
        );
    }});
    sortList(filteredCharacters);
});

function sortChars(){
    if(searchString!=="" && currentFilter=="none"){} else{
    filteredCharacters = userList.filter((character) => {
        if(character.house==currentFilter || currentFilter=="none"){
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString) &&
            character.house.toLowerCase().includes(currentFilter)
        );
    }});
    sortList(filteredCharacters);}
}

let favSort = [];
let favNumber ;

function sortList(list){
    favSort = [];
    let nonFavSort =[];
    for(let i = 0 ; i < list.length ; i++ ){
        if(list[i].alive=='fav'){
            favSort.push(list[i]);
        } else{
            nonFavSort.push(list[i]);
        }
    }
    favNumber = favSort.length;
    filteredSortedList = favSort.concat(nonFavSort);    
    displayChar(filteredSortedList);
}

let hpCharacters = [];
let hpList = [];
const loadCharacters = async () => {
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        hpCharacters = await res.json();
        hpCharacters.forEach(element => {
            if(element.image){
                hpList.push(element);
            }
        });
        displayCharacters(userList);
};

const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {
    {
            return `
            <div class="card">
            <div class="imgcard">
            <img class ="cardimg" src="${character.image}"></img>
            </div>
            <div class="textcard">
            <h2>${character.name}</h2>
            <h3>House: ${character.house}</h3>
            <h3>Actor: ${character.actor}</h3>
            <div class="h_container">
            <i id="heart" class="far fa-heart"></i>
            </div>
            </div>
            </div>
        `;
    }
}).join('');
    cardContainer.innerHTML = htmlString;
};

loadCharacters();


let tempChar ;
let tempChar2 ;


let boosterb = document.getElementById("booster");
boosterb.addEventListener("click", function(){
    for(let i = 0; i <3; i++){
        tempChar = [hpList[Math.floor(Math.random()*hpList.length)]];
        tempChar2 = JSON.parse(JSON.stringify(tempChar));
        userList= userList.concat(tempChar2);
    }
    for(let i = userList.length-1; i > userList.length-4; i--){
        userList[i].eyeColour="common";
        userList[i].alive="nofav";
    }
    if(Math.random()>0.5){
        let random1 = userList.length-Math.floor(Math.random()*3)-1
        userList[random1].eyeColour="rare";
    }
    if(Math.random()>0.8){
        let random2 = userList.length-Math.floor(Math.random()*3)-1
        userList[random2].eyeColour="legendary";
    }
    sortChars(userList);
});

const displayChar = (characters) => {
    let htmlString = "";
    characters.forEach((character,i)=> {htmlString = `${htmlString}
    <div id="${character.eyeColour}" class="card">  
    <div class="imgcard">
    <img class ="cardimg" src="${character.image}"></img>
    </div>
    <div class="textcard">
    <h2>${character.name}</h2>
    <h3>House: ${character.house}</h3>
    <h3>Actor: ${character.actor}</h3>
    <h3>Rarity: ${character.eyeColour}</h3>
    <div class="h_container" id="heartc${i}">
    <i id="heart" class="far fa-heart"></i>
    </div>
    </div>
    </div>
    `});
    cardContainer.innerHTML = htmlString;
    document.querySelectorAll("div.h_container").forEach(x => {
        x.addEventListener('click',function(){
            heart(this);
        })
    })
    displayRare();
    for(let i = 0; i<favNumber ; i++){
        document.getElementById(`heartc${i}`).classList.toggle("favorited");
    }
}

function displayRare() {
    document.querySelectorAll("Rare").forEach(element => {
        element.classList.toggle("rare");
    });
    document.querySelectorAll("Legendary").forEach(element => {
        element.classList.toggle("legendary");
    });
}

function heart(element){
    let hid = element.id ;
    let num = hid.split("c").pop();
    num = parseInt(num);
    if(filteredSortedList[num].alive=="nofav"){
        filteredSortedList[num].alive="fav";}
    else{
        filteredSortedList[num].alive="nofav"
    }
    sortList(filteredSortedList);
    console.log(element);
}
let favList = [];

function sortUserlist(){
    favList = [];
    let nonFavList =[];
    for(let i = 0 ; i < userList.length ; i++ ){
        if(userList[i].alive=='fav'){
            favList.push(userList[i]);
        } else{
            nonFavList.push(userList[i]);
        }
    }
    favNumber = favList.length;
    userList = favList.concat(nonFavList);
    displayChar(userList);
}

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
    sortChars(userList);
    console.log(currentFilter);
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
