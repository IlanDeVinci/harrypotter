"use strict"

let passwordInput = document.getElementById('password'); //on récupère l'élément html password
let passCorrect = false;
//fonction qui regarde si le mot de passe est assez sécurisé
function validatePassword() {
    let passwordError = document.getElementById('mdpError');
    let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\\/-]).{8,}$/; //liste de caractères spéciaux

    if (passwordRegex.test(passwordInput.value) && passwordInput.value.length >= 8) { //on regarde si le mot de passe contient les caractères et fait plus que 8 caractères de long
        passwordError.textContent = '';
        passCorrect = true; //le mdp est correct
    } else {
        passCorrect = false; //sinon le mdp est faux
        passwordError.textContent = 'The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character and be 8 characters or longer.'; //message d'erreur
    }
}

passwordInput.addEventListener('input', validatePassword);

let mailCorrect = false;
let mailInput = document.getElementById('mail');
//même fonction que pour le mot de passe mais pour l'adresse mail
function validateMail() {
    let mailError = document.getElementById('mailError');
    let mailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (mailRegex.test(mailInput.value) && mailInput.value.length >= 8) {
        mailError.textContent = '';
        mailCorrect = true;
    } else {
        mailCorrect = false;
        mailError.textContent = `The email adress is not valid.`;
    }
}


mailInput.addEventListener('input', validateMail);

//on check si il y a une adresse mail stockée dans le localstorage et on l'insère dans le input
if (typeof localStorage['email'] !== 'undefined') {
    mailInput.value = localStorage['email'];
    validateMail();
}
//on stock l'input de l'adresse mail dans le localstorage dynamiquement
mailInput.addEventListener('input', function() {
    localStorage['email'] = mailInput.value;
})
let nameCorrect = true;
let nameInput;

//même principe que pour le mot de passe et l'adresse mail
function validateName() {
    nameCorrect = false;
    let nameError = document.getElementById('nameError');
    if (nameInput.value.length >= 3) {
        nameError.textContent = '';
        nameCorrect = true;
    } else {
        nameCorrect = false;
        nameError.textContent = `A name must be at least 3 letters long`;
    }
}


if (document.URL.includes("register")) {
    nameInput = document.getElementById('name');
    nameInput.addEventListener('input', validateName);
}

let username, password, email;

//fonction submit qui va collecter les informations et les stocker dans des variables

document.getElementById('submit').addEventListener("click", function(e) {
    e.preventDefault();
    if (passCorrect && mailCorrect && nameCorrect) {
        if (document.URL.includes("register")) {
            document.getElementById('submitted').innerHTML = 'You have submitted the form. You can now log in.';
        } else {
            document.getElementById('submitted').innerHTML = 'You are logged in.';
        }

        username = document.querySelector('#name').value;
        password = document.querySelector('#password').value;
        email = document.querySelector('#mail').value;
    } else {
        document.getElementById('submitted').innerHTML = 'The form is not correct.';

    }
})


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