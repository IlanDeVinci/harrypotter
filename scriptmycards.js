"use strict"


const cardContainer = document.getElementById('cardContainer');


let modal = document.getElementById("modal");


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
    list.forEach((character)=>{
        if(character.delete=="ciao"){
            list.splice(list.indexOf(character),1)
        }
    })
    for(let i = 0 ; i < list.length ; i++ ){
        if(list[i].favorite=='fav'){
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
        const res = await fetch('https://hp-api.lainocs.fr/characters');
        hpCharacters = await res.json();
        hpCharacters.forEach(element => {
            if(element.image){
                hpList.push(element);
            }
        });
        hpList.forEach(element =>{
            if(element.house==""){
                element.house = "None";
            }
        })
        displayChar(userList);
};

loadCharacters();


let tempChar ;
let tempChar2 ;
let boosterCd = false;
let boosterb = document.getElementById("booster");
let cdBar = document.getElementById("cdbar");
let boostContainer = document.getElementById("boostercontainer");


boosterb.addEventListener("click", function(){
   
    if(!(currentFilter=="none")){
        changeTheme(currentFilter);
        currentFilter = "none";
    }
    if(!boosterCd){
    boosterCd=true;
    boostContainer.classList.add("deadgebutton");
    boosterb.classList.add("deadgebutton");
    cdBar.classList.remove("round-time-bar");
    cdBar.offsetWidth;
    cdBar.classList.add("round-time-bar");
    cdBar.style = "--duration: 10;";
    searchBar.disabled=true;
    setTimeout(() => {
    boosterCd=false;
    searchBar.disabled=false;
    boosterb.classList.remove("deadgebutton");
    boostContainer.classList.remove("deadgebutton");
    }, 10000);
    userList.forEach(element => {
        element.isnew="nah";
    })
    for(let i = 0; i <3; i++){
        setTimeout(() => {
            pity +=1;
            localStorage.setItem("pity", pity);
            tempChar = [hpList[Math.floor(Math.random()*hpList.length)]];
            tempChar[0].isnew="cardbooster";
            tempChar[0].rarity="common";
            tempChar[0].favorite="nofav";
             let randomnum = Math.random();
             if(randomnum>0.75){
                tempChar[0].rarity="rare";
             }
             if(randomnum>0.9){
                tempChar[0].rarity="legendary";
             }
             if(randomnum>0.975){
                tempChar[0].rarity="mythical";
                pity = 0;
             }
             if(pity>25){
                tempChar[0].rarity="mythical";
                pity = 0;
             }
            tempChar2 = JSON.parse(JSON.stringify(tempChar));
            userList= tempChar2.concat(userList);
            sortChars();
            userList.forEach(element => {
                element.isnew="nah";
            })
        }, i*3000);
    }
    searchBar.value = "";
    searchString = "";
    setTimeout(() => {
        userList.forEach(element => {
            element.isnew="nah";
        })
        sortChars();
    }, 9050);       
            }
    }
);

const displayChar = (characters) => {
    
    let htmlString = "";
    characters.forEach((character,i)=> {htmlString = `${htmlString}
        <div id="${character.rarity}" class="card ${character.isnew}">  
            <div class="imgcard">
                <a href="single.html?slug=${character.slug}">
                    <img class ="cardimg" src="${character.image}"></img>
                </a>
            </div>
            <div class="textcard">
                <h2>${character.name}</h2>
                <h3>House: ${character.house}</h3>
                <h3>Actor: ${character.actor}</h3>
                <h3>Rarity: ${character.rarity}</h3>
                <div class="cardbuttons">
                    <div class="x_container" id="x${i}">
                        <i id="x" class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="h_container" id="heartc${i}">
                        <i id="heart" class="far fa-heart"></i>
                    </div>
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
    document.querySelectorAll("div.x_container").forEach(x => {
        x.addEventListener('click',function(){
            ciao(this);
        })
    })
    displayRare();
    for(let i = 0; i<favNumber ; i++){
        document.getElementById(`heartc${i}`).classList.toggle("favorited");
    }
    localStorage.setItem("cards", JSON.stringify(userList));
    if(!boosterCd){
        let i = 0;
        document.querySelectorAll(".card").forEach(element => {
            let speed = (1/userList.length)*1000
            i++
            setTimeout(function fade(){element.classList.add("fade")},speed*i);
            ;
        });
    } else{
        document.querySelectorAll(".card").forEach(element =>{
            element.classList.add("appear");
        }

        )
    }
  
    userList.forEach(element => {
        element.isnew="nah";
    });
}

function clearUserlist(){
    userList=[];
    favNumber=0;
    displayChar(userList);
}


function displayRare() {
    document.querySelectorAll("Rare").forEach(element => {
        element.classList.toggle("rare");
    });
    document.querySelectorAll("Legendary").forEach(element => {
        element.classList.toggle("legendary");
    });
    document.querySelectorAll("Mythical").forEach(element => {
        element.classList.toggle("mythical");
    })
}

function ciao(element){
    let xid = element.id ;
    let num = xid.split("x").pop();
    num = parseInt(num);
    filteredSortedList[num].delete="ciao";
    sortList(filteredSortedList);
    sortUserlist();
}


function heart(element){
    let hid = element.id ;
    let num = hid.split("c").pop();
    num = parseInt(num);
    if(filteredSortedList[num].favorite=="nofav"){
        filteredSortedList[num].favorite="fav";}
    else{
        filteredSortedList[num].favorite="nofav"
    }
    sortList(filteredSortedList);
}
let favList = [];

function sortUserlist(){
    favList = [];
    let nonFavList =[];
    userList.forEach((character)=>{
        if(character.delete=="ciao"){
            userList.splice(userList.indexOf(character),1)
        }
    })
    for(let i = 0 ; i < userList.length ; i++ ){

        if(userList[i].favorite=='fav'){
            favList.push(userList[i]);
        } else{
            nonFavList.push(userList[i]);
        }
    }
    favNumber = favList.length;
    userList = favList.concat(nonFavList);
}

let currentFilter = "none";

function changeTheme(name){
    document.querySelectorAll("button").forEach(e => {
        if(currentFilter==e.id && name !== e.id){
            e.classList.toggle(currentFilter);
        }
    })
    document.getElementById("nav").classList.toggle(currentFilter);
    document.getElementById("main").classList.toggle(currentFilter);
    document.getElementById("body").classList.toggle(currentFilter);
    document.getElementById(name).classList.toggle(name);
    if(currentFilter==name){
        currentFilter = "none";
    } else{
    currentFilter = name;
    document.getElementById("nav").classList.toggle(currentFilter);
    document.getElementById("main").classList.toggle(currentFilter);
    document.getElementById("body").classList.toggle(currentFilter);
    }
    sortChars(userList);
}

document.getElementById("Gryffindor").addEventListener("click", function() {
    if(!boosterCd){    changeTheme("Gryffindor");
}
});
document.getElementById("Hufflepuff").addEventListener("click", function() {
    if(!boosterCd){    changeTheme("Hufflepuff");
}
});
document.getElementById("Slytherin").addEventListener("click", function() {
    if(!boosterCd){    changeTheme("Slytherin");
}
});
document.getElementById("Ravenclaw").addEventListener("click", function() {
    if(!boosterCd){  changeTheme("Ravenclaw");}
});
document.getElementById("None").addEventListener("click", function() {
    if(!boosterCd){    changeTheme("None");
}
});

if(typeof localStorage['cards'] !== 'undefined'){
    userList = JSON.parse(localStorage.getItem("cards"));
    sortChars(userList);
    displayRare();
    sortUserlist();
}

let pity = 0;

if(typeof localStorage['pity'] !== 'undefined'){
    pity = JSON.parse(localStorage.getItem("pity"));
}

let cardChoose = document.getElementById("cardchoose");

document.getElementById("floating-button").addEventListener("click", function(){
    modal.style.display = "block";
    let cardString = "";
    userList.forEach((character,i)=> {cardString = `${cardString}
    <option value="${i}">${character.name}, ${character.rarity}</option>
    `});
    cardChoose.innerHTML = cardString;
})

document.getElementById("submitcard").addEventListener("click", function(e){
    e.preventDefault();
    let cardValue = cardChoose.value;
    let showCard ="";
    if(userList.length>0){
    showCard = ` <div id="${userList[cardValue].rarity}" class="card fade">  
    <div class="imgcard">
    <img class ="cardimg" src="${userList[cardValue].image}"></img>
    </div>
    <div class="textcard">
    <h2>${userList[cardValue].name}</h2>
    <h3>House: ${userList[cardValue].house}</h3>
    <h3>Actor: ${userList[cardValue].actor}</h3>
    <h3>Rarity: ${userList[cardValue].rarity}</h3>
    </div>
    </div>`;
    }
    else {showCard = `<h2>You have no cards</h2>`}
    document.getElementById("showCard").innerHTML = showCard;
    e.preventDefault();
})

const burgerIcon =document.getElementById("burgericon");
const menu = document.getElementById('menu');

burgerIcon.addEventListener('click', function() {
burgerIcon.classList.toggle('menuout');
menu.classList.toggle('active');
document.getElementById("home").classList.toggle('hide');
document.getElementById("mycards").classList.toggle('hide');
document.getElementById("archive").classList.toggle('hide');
})