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

    const filteredCharacters = userList.filter((character) => {
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
    try {
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        hpCharacters = await res.json();
        hpCharacters.forEach(element => {
            if(element.image){
                hpList.push(element);
            }
        });
        displayCharacters(userList);

    } catch (err) {
        console.error(err);
    }
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
    displayChar(userList);
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
    for(let i = 0; i<favList.length ; i++){
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
    if(userList[num].alive=="nofav"){
        userList[num].alive="fav";}
    else{
        userList[num].alive="nofav"
    }
    sortUserlist();
    displayChar(userList);
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

    userList = favList.concat(nonFavList);
}
