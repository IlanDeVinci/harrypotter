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



let searchBar = document.getElementById("search");
//fonctionnement de la barre de recherche dynamique
searchBar.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase();
    //searchstring contient l'input de l'utilisateur
    const filteredCharacters = hpList.filter((character) => {
        //filteredcharacters est la nouvelle liste de personnages filtrée
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
            //on renvoie seulement dans la liste filtrée les personnages dont le nom ou la maison contient l'input de l'utilisateur
        );
    });
    displayCharacters(filteredCharacters);
});



let hpCharacters = [];
let hpList = [];
let userList = [];
const loadCharacters = async () => {
    const res = await fetch('https://hp-api.lainocs.fr/characters'); //on va chercher la liste des personnages dans l'API 
    hpCharacters = await res.json(); //on la met dans hpCharacters
    hpCharacters.forEach(element => {
        if (element.image) {
            hpList.push(element); //on ajoute à hpList seulement les personnages qui ont une image
        }
        hpList.forEach(element => {
            if (element.house == "") {
                element.house = "None"; //on remplace le "" par None pour les personnages qui n'ont pas de maison
            }
        })

    });
    displayCharacters(hpList);
};

//cette fonction crée les cartes de chaque personnage
const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => { //on exécute le code suivant pour chaque personnage de la liste characters
            //on crée un string qui contient ce qui va être inséré dans l'html
            if (character.house == currentFilter || currentFilter == "none") { //on ajoute la carte seulement si elle correspond au filtre
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
                } //le code ci-dessus constitue une carte avec un personnage, son image, son nom, sa maison, son acteur
            }
        })
        .join('');
    cardContainer.innerHTML = htmlString; //on ajoute le string dans le code html pour afficher les cartes
    let i = 0;
    document.querySelectorAll(".card").forEach(element => { //on sélectionne toutes les cartes sur la page
        i++;
        setTimeout(function fade() {
            element.classList.add("fade")
        }, 50 * i); //on donne un effet de fade in à chaque carte avec un intervalle de 50 millisecondes
    });
}


loadCharacters();
let currentFilter = "none";
//la fonction suivante change le thème du site en fonction du bouton cliqué + change et applique le filtre

function changeTheme(name) {
    document.querySelectorAll('[data-="sortbutton"]').forEach(e => {
        if (currentFilter == e.id && name !== e.id) {
            e.classList.toggle(currentFilter); //désactive le visuel du précédent filtre
        }
    })
    document.getElementById("nav").classList.toggle(currentFilter); //désactive le visuel du précédent filtre
    document.getElementById("main").classList.toggle(currentFilter); //idem
    document.getElementById("body").classList.toggle(currentFilter); //idem
    document.getElementById(name).classList.toggle(name); //active le visuel du bouton du nouveau filtre
    if (currentFilter == name) {
        currentFilter = "none"; //désactive le filtre si le bouton a été appuyé deux fois de suite
    } else {
        currentFilter = name; //change la variable au nouveau filtre
        document.getElementById("nav").classList.toggle(currentFilter); //active le visuel du site du nouveau filtre
        document.getElementById("main").classList.toggle(currentFilter);
        document.getElementById("body").classList.toggle(currentFilter);
    }
    displayCharacters(hpList); //actualise la liste des personnages
}

//ajoute une fonction qui s'exécute lorsqu'on clique un des boutons filtres
document.querySelectorAll('[data-="sortbutton"]').forEach(element => {
    element.addEventListener("click", function() {
        changeTheme(element.id);
    })
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