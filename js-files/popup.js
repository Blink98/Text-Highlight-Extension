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

// Redirect to login/sign up page if user is not logged in.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    window.location = "/html-files/auth.html"
  }
});


// Swich Login and SignUp forms
const fileLabel = document.getElementById("fileLabel");
const urlLabel = document.getElementById("urlLabel");

const fileForm = document.getElementById("fileForm");
const urlForm = document.getElementById("urlForm");

const switchForm = () => {
    // Switching Labels
    fileLabel.classList.toggle("not-selected");
    fileLabel.classList.toggle("selected");
    urlLabel.classList.toggle("selected");
    urlLabel.classList.toggle("not-selected");
    // Switching forms
    urlForm.classList.toggle("hide-element");
    urlForm.classList.toggle("show-form");
    fileForm.classList.toggle("show-form");
    fileForm.classList.toggle("hide-element");
}

fileLabel.addEventListener("click", switchForm);
urlLabel.addEventListener("click", switchForm);

// Error Paragraph
const fileError = document.getElementById("fileError");
const urlError = document.getElementById("urlError");

// Browsing the File
const fileInput = document.getElementById("fileInput");
const browseFile = document.getElementById("browseFile");

browseFile.addEventListener("click", () => fileInput.click());
// Showing the filename
const fileName = document.getElementById("fileName");
const closeBtn = document.getElementById("closeBtn");


// Removing the filename
function removeFileInput() {
    fileName.innerText = "No file chosen, yet...";
    fileName.parentElement.classList.remove("file-added");
    closeBtn.classList.add("hide-element");
    fileInput.value = "";
}
// Removing the file
closeBtn.addEventListener("click", removeFileInput);
// When the file is uploaded show its name and Close button.
fileInput.addEventListener("change", () => {
    if (fileInput.value) {
        fileName.parentElement.classList.add("file-added");
        let originalFileName = fileInput.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        if (originalFileName.length <= 18) {
            fileName.innerText = originalFileName; 
        } else if (originalFileName.length > 18 && originalFileName.length <= 22) {
            fileName.innerText = `${originalFileName.slice(0, 6)}...${originalFileName.slice(-6,)}`; 
        } else {
            fileName.innerText = `${originalFileName.slice(0, 8)}...${originalFileName.slice(-8,)}`; 
        }
        closeBtn.classList.remove("hide-element");
    } else {
        removeFileInput;
    }
});


// Firebase stuff starts here...

// Loader
const loader = document.getElementById("loader");

// Extracting and going to result screen
const fileExtractBtn = document.getElementById("fileExtractBtn");
fileInput.addEventListener("change", (e) => file = e.target.files[0]);

fileExtractBtn.addEventListener("click", () => {
    if(fileInput.value == ""){
        fileError.innerText = "* Please, select a file.";
        fileError.classList.remove("hide-element");
    } else {
        fileError.classList.add("hide-element");
    }

    var storageRef = firebase.storage().ref(`User Image/${file.name}`);
    var uploadTask = storageRef.put(file);
    localStorage["fileName"] = `${file.name}`;

    uploadTask.on("state_changed", function (snapshot) {
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is " + progress + " done.")
        loader.classList.remove("hide-element");
        if (progress == 100){
            loader.classList.add("hide-element")
            window.location = "/html-files/result.html";
        }
    }, function (err) {
        console.log(err.message);
    });
});

// URL Extraction
const urlInput = document.getElementById("urlInput"); // URL input field
const urlExtractBtn = document.getElementById("urlExtractBtn");
urlExtractBtn.addEventListener("click", () => {
    if(urlInput.value == ""){
        urlError.innerText = "* Please, Enter a URL.";
        urlError.classList.remove("hide-element");
    } else {
        urlError.classList.add("hide-element");
    }
});


// Logging Out
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    console.log("starting");
    firebase.auth().signOut().then(() => {
        console.log("Sign-out successful.");
        window.location = "/html-files/auth.html";
    }).catch((error) => {
        console.log("An error happened.");
        console.log(`${error}`);
    });
    console.log("end");
});

