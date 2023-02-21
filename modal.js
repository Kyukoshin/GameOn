function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const specialCharacters = /[^a-zA-Z\è\é\ï ]/g; // regex for names check
const mailFormat = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/; // regex for email check (starts with letter, at least 2 defined characters before "@"", then at least 2 letters or numbers before ".", then at least 2 letters or numbers)
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const crossBtn = document.querySelector(".close");
const closeBtn = document.querySelector(".close-form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const turnament = document.getElementById("quantity");
const cityLocation = document.getElementsByName("location"); // Table of available locations
const cities = document.getElementById ('location1'); // Anchor for text input
const CGU = document.getElementById("checkbox1");
const submitBtn = document.getElementById("submitButton");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.querySelector('.thanks').style.display = "none"; // Make the thanks div hidden on click
}

// Close modal if cross is clicked
crossBtn.addEventListener("click", function () {
  modalbg.style = "display:none;";
});

// Close modal if "fermer" is clicked
closeBtn.addEventListener("click", function () {
  modalbg.style = "display:none;";
  document.querySelector('.form').style.display = "block"; // re activate form visibility for future submissions
});

function validate() {
  event.preventDefault(); // Prevent form from being submitted
  allValidated(); // Call function to validate all fields

  //Check if all fields ok
  if (validFirstName() && validLastName() && validEmail() && validBirthdate() && validTurnament() && validLocation() && validCGU()) {
    sendForm();
    displayThanks();
  }
};

function allValidated() {
  validFirstName();
  validLastName();
  validEmail();
  validBirthdate();
  validTurnament();
  validLocation();
  validCGU();
}

// FirstName validation
function validFirstName() {
  if (firstName.value.length == 0){
    setInvalid(firstName, "Veuillez entrer votre prénom.");
    return false;  
  } else if (firstName.value.match(specialCharacters)) {
    setInvalid(firstName, "Veuillez entrer un prénom valide. (Uniquement des lettres)");
    return false;
  } else if (firstName.value.length < 2){
    setInvalid(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    return false;
  } else {
    setValid(firstName);
    return true;
  }
}

// LastName validation
function validLastName() {
  if (lastName.value.length == 0){
    setInvalid(lastName, "Veuillez entrer votre prénom.");
    return false;  
  } else if (lastName.value.match(specialCharacters)) {
    setInvalid(lastName, "Veuillez entrer un nom valide. (Uniquement des lettres)");
    return false;
  } else if (lastName.value.length < 2){
    setInvalid(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    return false;
  } else {
    setValid(lastName);
    return true;
  }
}

// Email validation
function validEmail() {
  if (email.value.length == 0){
    setInvalid(email, "Veuillez indiquer votre email.");
    return false;
  } else if (!email.value.match(mailFormat)) {
    setInvalid(email, "Veuillez indiquer un email valide.");
    return false;
  } else {
    setValid(email);
    return true;
  }
}

// Birthdate validation
function validBirthdate() {
  if (birthdate.value.length == 0){
    setInvalid(birthdate, "Veuillez indiquer votre date de naissance.");
    return false;
  } else {
    setValid(birthdate);
    return true;
  }
}

// Turnament amount validation
function validTurnament() {
  if (!turnament.value) {
    setInvalid(turnament, "Veuillez indiquer à combien de tournois vous avez participé.");
    return false;
  } else {
    setValid(turnament);
    return true;
  }
}

// Location validation
function validLocation(){
  var checkOk = 0;
  for(i=0;i<cityLocation.length;i++){
    if(cityLocation[i].checked){
      checkOk++;
      break;
    }
  }
  if(checkOk){
    setValidCheck(cities);

    return true;
  }else{
    setInvalidCheck(cities, "Veuillez indiquer à quel tournoi vous souhaitez participer.");
    return false;
  }
}

// CGU validation
function validCGU() {
  if (CGU.checked) {
    setValidCheck(CGU);
    return true;
  } else {
    setInvalidCheck(CGU, "Veuillez accepter les CGU.");
    return false;
  }
}

// Change style and text in case of input error
function setInvalid(element, errorText) { 
  const parent = element.parentElement; // Select parent
  const textField = parent.querySelector('.error'); // Select display container of error message
  textField.innerText = errorText; // Display specific error text
  element.className = 'text-control input-invalid'; // Red outline input field
}

// Change style in case of correct input
function setValid(element) {  
  const parent = element.parentElement; // Select parent
  const textField = parent.querySelector('.error'); // Select display container of error message
  textField.innerText = ""; // Remove any text
  element.className = 'text-control input-valid'; // Green outline input field
}

// Change style and text in case of input error in checkbox
function setInvalidCheck(element, errorText) { 
  const parent = element.parentElement; // Select parent
  const textField = parent.querySelector('.error'); // Select display container of error message
  textField.innerText = errorText; // Display specific error text
}

// Change style in case of correct input in checkbox
function setValidCheck(element) {  
  const parent = element.parentElement; // Select parent
  const textField = parent.querySelector('.error'); // Select display container of error message
  textField.innerText = ""; // Remove any text
}

function sendForm() {
  document.querySelector('.form').reset(); //Reset form after submit
  
  // Remove all input highlights
  const elements = document.querySelectorAll('.input-valid');
  elements.forEach((element) => {
    element.classList.remove('input-valid');
  });
}

function displayThanks() {
  document.querySelector('.form').style.display = "none"; // Hide form
  document.querySelector('.thanks').style.display = "flex"; // Display thanks div
}