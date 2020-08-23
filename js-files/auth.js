// ######################## HEADER ############################ // 
// Swich Login and SignUp forms
const loginLabel = document.getElementById("loginLabel");
const signUpLabel = document.getElementById("signUpLabel");

const loginForm = document.getElementById("loginForm");
const signUpForm = document.getElementById("signUpForm");

const switchForm = () => {
    // Switching Labels
    loginLabel.classList.toggle("not-selected");
    loginLabel.classList.toggle("selected");
    signUpLabel.classList.toggle("selected");
    signUpLabel.classList.toggle("not-selected");
    // Switching forms
    signUpForm.classList.toggle("hide-element");
    signUpForm.classList.toggle("show-form");
    loginForm.classList.toggle("show-form");
    loginForm.classList.toggle("hide-element");
}

loginLabel.addEventListener("click", switchForm);  
signUpLabel.addEventListener("click", switchForm);

// Footer Links
const signUpLink = document.getElementsByClassName("footer-link")[0];
const loginLink = document.getElementsByClassName("footer-link")[1];

// ######################## EYE BUTTON ############################ // 
// Show and Hide Password using Eye Button
const showBtns = document.getElementsByClassName("show-password");
// const loginPassword = document.getElementById("loginPassword");
const passwordInput = document.getElementsByClassName("password-input");
const passwordContainer = document.getElementById("password-input-container");
// Function to toggle eye icon
const showOrHide = (num) => {    
    if (showBtns[num].src.includes("show")){
        showBtns[num].src = "/Images/icons/hide.svg";
        passwordInput[num].type = "text";
    } else {
        showBtns[num].src = "/Images/icons/show.svg";
        passwordInput[num].type = "password";
    }
}
showBtns[0].addEventListener("click", () => showOrHide(0));
showBtns[1].addEventListener("click", () => showOrHide(1));



// ######################## FIREBASE ############################ // 
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB-lEpItMY87NX-o0-8-yEIIW1zF7Qh9OY",
    authDomain: "bibly-92def.firebaseapp.com",
    databaseURL: "https://bibly-92def.firebaseio.com",
    projectId: "bibly-92def",
    storageBucket: "bibly-92def.appspot.com",
    messagingSenderId: "742355570811",
    appId: "1:742355570811:web:92c3fa2327b98dd0c652de"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Logging in
const loginError = document.getElementById("loginError");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const login = document.getElementById("login");

login.addEventListener("click", () => {
    console.log("starting to login");
    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(auth => {
        console.log(auth);
        console.log("loggedin");
        loginError.classList.add("hide-element");
        window.location = "../popup.html";
    }).catch((error) => {
        console.log(error.message);
        loginError.innerText = `* ${error.message}`;
        loginError.classList.remove("hide-element");
    });
    console.log("end");
});

// Sign Up
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUp = document.getElementById("signUp");
const signUpError = document.getElementById("signUpError");

signUp.addEventListener("click", () => {
    console.log("starting");
    firebase.auth().createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
    .then(auth => {
        console.log(auth);
        signUpError.classList.add("hide-element");
        window.location = "../popup.html";
    }).catch((error) => {
        console.log(error.message);
        signUpError.innerText = `* ${error.message}`;
        signUpError.classList.remove("hide-element");
    });
    console.log("submitted");
});


// Google Login
const googleBtn = document.getElementById("googleBtn");
const provider = new firebase.auth.GoogleAuthProvider();

googleBtn.addEventListener("click", () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
        var user = result.user;
        console.log(user);
        console.log(user.displayName);
        window.location = "../popup.html";
    }).catch((err) => {
        console.log(err);
    })
});