"use strict"

let passwordInput = document.getElementById('password');
let passCorrect = false ;
function validatePassword() {
    let passwordError = document.getElementById('mdpError');
    let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\\/-]).{8,}$/;

    if (passwordRegex.test(passwordInput.value) && passwordInput.value.length >= 8) {
        passwordError.textContent = '';
        passCorrect = true ;
    } else {
        passCorrect = false ;
        passwordError.textContent = 'The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character and be 8 characters or longer.';
    }
}

passwordInput.addEventListener('input',validatePassword);
let mailCorrect = false ;
let mailInput = document.getElementById('mail');
function validateMail() {
    let mailError = document.getElementById('mailError');
    let mailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (mailRegex.test(mailInput.value) && mailInput.value.length >= 8) {
        mailError.textContent = '';
        mailCorrect = true ;
    } else {
        mailCorrect = false ;
        mailError.textContent = `The email adress is not valid.`;
    }
}


mailInput.addEventListener('input',validateMail);
if(typeof localStorage['email'] !== 'undefined'){
    mailInput.value=localStorage['email'];
    validateMail();
}
mailInput.addEventListener('input',function(){
    localStorage['email']=mailInput.value;
})
let nameCorrect = true ;
let nameInput;


function validateName() {
    nameCorrect = false ;
    let nameError = document.getElementById('nameError');
    if (nameInput.value.length >= 3) {
        nameError.textContent = '';
        nameCorrect = true ;
    } else {
        nameCorrect = false ;
        nameError.textContent = `A name must be at least 3 letters long`;
    }
}
if(document.URL.includes("register")){
    nameInput = document.getElementById('name');
    nameInput.addEventListener('input',validateName);
}



document.getElementById('submit').addEventListener("click", function(e){
    e.preventDefault();
    if(passCorrect && mailCorrect && nameCorrect){
        if(document.URL.includes("register")){
    document.getElementById('submitted').innerHTML='You have submitted the form. You can now log in.';}
        else{document.getElementById('submitted').innerHTML='You are logged in.';}
    
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    let email = document.querySelector('#mail').value;
    } else {
    document.getElementById('submitted').innerHTML='The form is not correct.';

    }
})





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

