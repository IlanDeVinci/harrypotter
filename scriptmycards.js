"use strict"


const cardContainer = document.getElementById('cardContainer');


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

let userList = [];
let filteredCharacters = [];
let filteredSortedList = [];
let searchString = "";

//fonctionnement de la barre de recherche dynamique
let searchBar = document.getElementById("search");
searchBar.addEventListener('input', (e) => {
    searchString = e.target.value.toLowerCase();
    //searchstring contient l'input de l'utilisateur
    filteredCharacters = userList.filter((character) => {
    //filteredcharacters est la nouvelle liste de personnages filtrée
        if (character.house == currentFilter || currentFilter == "none") {
            return (
                character.name.toLowerCase().includes(searchString) ||
                character.house.toLowerCase().includes(searchString) &&
                character.house.toLowerCase().includes(currentFilter)
            //on renvoie seulement dans la liste filtrée les personnages dont le nom ou la maison contient l'input de l'utilisateur + le filtre de maison

            );
        }
    });
    sortList(filteredCharacters);
});

//la fonction suivante filtre la liste de personnage en fonction de la barre de recherche et du filtre de maison
function sortChars(list) {
    if (searchString !== "" && currentFilter == "none") {} else {
        filteredCharacters = list.filter((character) => {
            if (character.house == currentFilter || currentFilter == "none") {
                return (
                    character.name.toLowerCase().includes(searchString) ||
                    character.house.toLowerCase().includes(searchString) &&
                    character.house.toLowerCase().includes(currentFilter)
                );
            }
        });
        if(filteredCharacters.length>0)
        {
            sortList(filteredCharacters);
        }
        else //s'il n'y a pas de carte à afficher, affiche le texte suivant
        {
            cardContainer.innerHTML = `
            <h2>No cards</h2>
            `
        }
    }
}

let favSort = [];
let favNumber;

//cette fonction organise la liste de personnage en fonction des cartes mises en favori et supprime les cartes mises en "delete"
function sortList(list) {
    favSort = [];
    let nonFavSort = [];
    list.forEach((character) => {
        if (character.delete == "delete") {
            list.splice(list.indexOf(character), 1)//supprime la carte si elle a l'attribut delete
        }
    })
    for (let i = 0; i < list.length; i++) {
        if (list[i].favorite == 'fav') {
            favSort.push(list[i]);//ajoute dans la première liste les cartes mises en favori
        } else {
            nonFavSort.push(list[i]);//ajoute dans la deuxième liste les cartes non favorites
        }
    }
    favNumber = favSort.length;//calcule le nombre de cartes mises en favori pour l'affichage
    filteredSortedList = favSort.concat(nonFavSort);//crée une nouvelle liste à partir de la liste des favoris et des non-favoris pour avoir l'ordre
    displayChar(filteredSortedList);
}

let hpCharacters = [];
let hpList = [];
const loadCharacters = async () => {
    const res = await fetch('https://hp-api.lainocs.fr/characters');  //on va chercher la liste des personnages dans l'API 
    hpCharacters = await res.json(); //on la met dans hpCharacters
    hpCharacters.forEach(element => {
        if (element.image) {
            hpList.push(element); //on ajoute à hpList seulement les personnages qui ont une image
        }
    });
    hpList.forEach(element => {
        if (element.house == "") {
            element.house = "None"; //on remplace le "" par None pour les personnages qui n'ont pas de maison
        }
    })
    sortChars(userList);
};

loadCharacters();


let tempChar;
let tempChar2;
let boosterCd = false;
let boosterb = document.getElementById("booster");
let cdBar = document.getElementById("cdbar");
let boostContainer = document.getElementById("boostercontainer");

//la fonction suivante sert à l'ouverture des boosters
boosterb.addEventListener("click", function() {

    if (!(currentFilter == "none")) {//désactivation de tous les filtres
        changeTheme(currentFilter);
        currentFilter = "none";
    }
    if (!(currentRarity == "none")) {//désactivation de tous les filtres
        raritySort(currentRarity);
        currentRarity = "none";
    }
    if (!boosterCd) {//check si le cooldown est prêt pour le bouton
        boosterCd = true;
        document.querySelectorAll("button").forEach(element => {
            element.classList.add("deadgebutton") //rend inutilisable tous les boutons pour la durée du pack opening
        })
        document.querySelector("#boostercontainer").classList.add("deadgebutton");
        //supprimer et re-ajouter une class à la barre cooldown permet de réinitialiser son animation
        cdBar.classList.remove("round-time-bar");
        cdBar.offsetWidth;
        cdBar.classList.add("round-time-bar");
        cdBar.style = "--duration: 10;";//on lui donne une duration de 10 secondes
        searchBar.disabled = true;//on rend inutilisable la barre de recherche
        setTimeout(() => {//ce set timeout va réinitialiser le cooldown et va rendre les boutons et la barre de recherche utilisables après 10 secondes
            boosterCd = false;
            searchBar.disabled = false;
            document.querySelectorAll("button").forEach(element => {
                element.classList.remove("deadgebutton")
            })
            document.querySelector("#boostercontainer").classList.remove("deadgebutton");
        }, 10000);
        userList.forEach(element => {
            element.isnew = "no";//ajoute l'attribut isnew=no à toutes les anciennes cartes(nécessaire pour attribuer les animations)
        })
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {// on met un délai de 3 secondes à chaque animation et création de carte
                pity += 1;//on ajoute 1 à la "pity", une garantie d'obtenir une carte mythique après un certain nombre de tirages
                localStorage.setItem("pity", pity);//on ajoute la pity au localstorage pour la sauvegarder
                tempChar = [hpList[Math.floor(Math.random() * hpList.length)]];//choix d'un personnage au hasard dans la liste
                tempChar[0].isnew = "cardbooster";//on lui donne un attribut pour qu'il ait l'animation booster
                tempChar[0].rarity = "common";//par défaut on lui donne la rareté common
                tempChar[0].favorite = "nofav";//par défaut il n'est pas en favori
                let randomnum = Math.random();//on choisit un nombre au hasard
                //en fonction du nombre on donne une rareté différente à la carte
                if (randomnum > 0.75) {
                    tempChar[0].rarity = "rare";
                }
                if (randomnum > 0.9) {
                    tempChar[0].rarity = "legendary";
                }
                if (randomnum > 0.975) {
                    tempChar[0].rarity = "mythical";
                    pity = 0;
                }
                //si on atteint plus que 25 pity la carte est garantie d'être mythique
                if (pity > 25) {
                    tempChar[0].rarity = "mythical";
                    pity = 0;
                }
                //on stringify et parse le tempChar pour le formatter correctement
                tempChar2 = JSON.parse(JSON.stringify(tempChar));
                //on ajoute la nouvelle carte à la liste de cartes de l'utilisateur
                userList = tempChar2.concat(userList);
                //on réorganise la liste
                sortChars(userList);
                //on remplace l'attribut cardbooster par no pour ne pas recommencer l'animation de la carte
                userList.forEach(element => {
                    element.isnew = "no";
                })
            }, i * 3000);
        }
        searchBar.value = "";//on retire l'input de la barre de recherche
        searchString = "";
        setTimeout(() => {//après 9050 millisecondes on remplace les attributs cardboosters par no à la fin de l'animation et on réorganise à nouveau les cartes pour mettre à jour la liste et les animations
            userList.forEach(element => {
                element.isnew = "no";
            })
            sortChars(userList);
        }, 9050);
    }
});

//displayChar crée les cartes de chaque personnage 
const displayChar = (characters) => {

    let htmlString = "";
    characters.forEach((character, i) => {//on exécute le code suivant pour chaque personnage de la liste characters
        //on crée un string qui contient ce qui va être inséré dans l'html
        htmlString = `${htmlString}
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
                        `
    });//le code ci-dessus constitue une carte avec un personnage, son image, son nom, sa maison, son acteur, sa rareté, un bouton pour mettre en favori et un bouton pour supprimer la carte

    cardContainer.innerHTML = htmlString; //on ajoute le string html dans le code html pour afficher les cartes
    document.querySelectorAll("div.h_container").forEach(x => { //on ajoute un click event aux boutons favori
        x.addEventListener('click', function() {
            heart(this);
        })
    })
    document.querySelectorAll("div.x_container").forEach(x => { //on ajoute un click event aux boutons supprimer
        x.addEventListener('click', function() {
            ciao(this);
        })
    })
    displayRare();
    for (let i = 0; i < favNumber; i++) { //on fait apparaître les favoris sur les cartes en rouge en fonction du nombre de favoris
        document.getElementById(`heartc${i}`).classList.toggle("favorited");
    }
    localStorage.setItem("cards", JSON.stringify(userList)); //on stocke les cartes dans le localstorage
    if (!boosterCd) {
        let i = -1;
        document.querySelectorAll(".card").forEach(element => {//on fait apparaître graduellement les cartes avec un effet de fade
            let speed = (1 / characters.length) * 1000 //plus il y a de cartes, plus elles s'afficheront vite
            i++
            setTimeout(function fade() {//la durée du timeout dépend du nombre total de cartes
                element.classList.add("fade")
            }, speed * i);;
        });
    } else {
        document.querySelectorAll(".card").forEach(element => {//si l'animation du booster est lancée, on ne met pas d'animation de fade aux cartes
                element.classList.add("appear");
            }

        )
    }

    userList.forEach(element => {//on enlève l'attribut cardbooster aux cartes qui pourraient l'avoir pour ne pas avoir d'animation booster non voulue
        element.isnew = "no";
    });
}

//fonction qui supprime toutes les cartes et les favoris de la liste
function clearUserlist() {
    userList = [];
    favNumber = 0;
    sortChars(userList);
}

//fonction qui donne les bonnes classes aux cartes pour qu'elles aient la bonne couleur en fonction de la rareté
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

//fonction qui va donner un attribut delete si on appuie sur le bouton supprimer d'une carte
function ciao(element) {
    let xid = element.id;
    let num = xid.split("x").pop();
    num = parseInt(num);
    filteredSortedList[num].delete = "delete";
    sortList(filteredSortedList);
    sortUserlist();
}

//fonction qui va donner un attribut favori si on appuie sur le bouton coeur d'une carte
function heart(element) {
    let hid = element.id;
    let num = hid.split("c").pop();
    num = parseInt(num);
    if (filteredSortedList[num].favorite == "nofav") {
        filteredSortedList[num].favorite = "fav";
    } else {
        filteredSortedList[num].favorite = "nofav"
    }
    sortList(filteredSortedList);
}
let favList = [];

//cette fonction organise la liste de personnage en fonction des cartes mises en favori et supprime les cartes mises en "delete"
function sortUserlist() {
    favList = [];
    let nonFavList = [];
    userList.forEach((character) => {
        if (character.delete == "delete") {
            userList.splice(userList.indexOf(character), 1)//supprime la carte si elle a l'attribut delete
        }
    })
    for (let i = 0; i < userList.length; i++) {

        if (userList[i].favorite == 'fav') {
            favList.push(userList[i]);//ajoute dans la première liste les cartes mises en favori
        } else {
            nonFavList.push(userList[i]);//ajoute dans la deuxième liste les cartes non favorites
        }
    }
    favNumber = favList.length;//calcule le nombre de cartes mises en favori pour l'affichage
    userList = favList.concat(nonFavList);//crée une nouvelle liste à partir de la liste des favoris et des non-favoris pour avoir l'ordre
}

let currentFilter = "none";
let currentRarity = "none";

//cette fonction change le thème du site et le filtre de maison des cartes
function changeTheme(name) {
    if (!(currentRarity == "none")) {//on retire le filtre de rareté pour ne pas causer de soucis
        raritySort(currentRarity);
        currentRarity = "none";
    }
    document.querySelectorAll('[data-="sortbutton"]').forEach(e => {//on retire le précédent visuel de filtre sur le bouton
        if (currentFilter == e.id && name !== e.id) {
            e.classList.toggle(currentFilter);
        }
    })
    document.getElementById("nav").classList.toggle(currentFilter);//on retire le précédent visuel sur les éléments du site
    document.getElementById("main").classList.toggle(currentFilter);
    document.getElementById("body").classList.toggle(currentFilter);
    document.getElementById(name).classList.toggle(name);
    if (currentFilter == name) {
        currentFilter = "none";//désactive le filtre si le bouton a été appuyé deux fois de suite
    } else {
        currentFilter = name;//change la variable au nouveau filtre
        document.getElementById("nav").classList.toggle(currentFilter);//active le visuel du site du nouveau filtre
        document.getElementById("main").classList.toggle(currentFilter);
        document.getElementById("body").classList.toggle(currentFilter);
    }
    sortChars(userList);//actualise la liste des personnages
}

//ajoute les fonctions qui s'exécutent lorsqu'on appuie sur les boutons filtres
document.querySelectorAll('[data-="sortbutton"]').forEach(element => {
    element.addEventListener("click", function() {
        if (!boosterCd) {//les boutons sont inaccessibles s'il y a le cooldown de l'animation
            if (!element.id.includes("Sort")) {//on différencie les boutons de filtre de maison et de rareté
                changeTheme(element.id);
            } else {
                raritySort(element.id);
            }

        }
    })
})

//cette fonction change le filtre de rareté des cartes
function raritySort(rarity) {
    document.querySelectorAll('[data-="sortbutton"]').forEach(e => {//on retire le précédent visuel de filtre sur le bouton
        if (currentRarity == e.id && rarity !== e.id) {
            e.classList.toggle(currentRarity);
        }
    })
    document.getElementById(rarity).classList.toggle(rarity);//on active le nouveau visuel filtre sur le bouton
    if (currentRarity == rarity) {
        currentRarity = "none";//désactive le filtre si le bouton a été appuyé deux fois de suite
    } else {
        currentRarity = rarity;//change la variable au nouveau filtre
    }
    let rarityS = rarity.replace("Sort", "").toLowerCase();//on retire le Sort du nom pour qu'il match avec la rareté sur les cartes
    if (!(currentRarity == "none")) {//on crée une nouvelle liste filtrée avec uniquement les cartes de la rareté demandée
        let rarityFiltered = userList.filter((character) => {
            return (
                character.rarity.toLowerCase().includes(rarityS)
            );
        });
        sortChars(rarityFiltered);//on réorganise les cartes
    } else {
        sortChars(userList);//on display la liste normalement s'il n'y a pas de filtre
    }
}


//on récupère les cartes existant dans le localstorage et on les affiche si elles existent
if (typeof localStorage['cards'] !== 'undefined') {
    userList = JSON.parse(localStorage.getItem("cards"));
    sortChars(userList);
    displayRare();
    sortUserlist();
}

let pity = 0;//on initialise à 0 la pity garantie

//on récupère la pity existante si elle existe 
if (typeof localStorage['pity'] !== 'undefined') {
    pity = JSON.parse(localStorage.getItem("pity"));
}

let cardChoose = document.getElementById("cardchoose");

//on fait apparaître le modal lorsqu'on clique sur le bouton
document.getElementById("floating-button").addEventListener("click", function() {
    modal.style.display = "block";
    //on va chercher la liste des cartes de l'utilisateur pet on la met dans une liste pour que l'utilisateur puisse en choisir une
    let cardString = "";
    userList.forEach((character, i) => {//itération à travers la liste des cartes
        cardString = `${cardString}
                                <option value="${i}">${character.name}, ${character.rarity}</option>
                                `
    });//on va créer une option dans la liste par carte
    cardChoose.innerHTML = cardString;//on ajoute le string au code html
})

//la fonction suivante va permettre de choisir une carte et de l'afficher dans le modal avant de l'échanger
document.getElementById("submitcard").addEventListener("click", function(e) {
    e.preventDefault();
    let cardValue = cardChoose.value;
    let showCard = "";
    //on fait apparaître la carte sans les boutons supprimer et favori
    if (userList.length > 0) {
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
    } else {//si la liste de cartes est vide, on affiche le texte suivant
        showCard = `<h2>You have no cards</h2>`
    }
    document.getElementById("showCard").innerHTML = showCard;
    e.preventDefault();
})

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
