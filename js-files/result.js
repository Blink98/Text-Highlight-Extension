const backBtn = document.getElementById("backBtn");

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");

// Hide the popup screen
closeBtn.addEventListener("click", () => {
    popup.classList.remove("show-popup");
    popup.classList.add("hide-element");
});

// Show the popup screen
backBtn.addEventListener("click", () => {
    popup.classList.remove("hide-element");
    popup.classList.add("show-popup");
})


const discardBtn = document.getElementById("discardBtn");

discardBtn.addEventListener("click", ()=> {
    window.location = "../popup.html";
})


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
const firestore = firebase.firestore();


// Run these statements after user is logged in.
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
        uid = user.uid;  // The user's ID
        }
        console.log("uid" + uid);
        var docId = localStorage["fileName"].replace(/\./g, "\\");
        const docRef = firestore.doc(`Bookmarks/${uid}/bookmarks/${docId}`);
        const noteTitle = document.getElementById("noteTitle");
        const noteText = document.getElementById("noteText");
        const saveBtn = document.getElementById("saveBtn");

        saveBtn.addEventListener("click", () => {
            console.log(`${noteTitle.value} and ${noteText.value}`);
            docRef.set({
                title: `${noteTitle.value}`,
                Note: `${noteText.value}`
            }).then(() => {
                console.log("success");
                window.location = "/popup.html";
            }).catch((err) => {
                console.log(`Error: ${err}`);
            });            
        });

        const getData = document.getElementById("getData");

        // Getting data from firestore and Putting value in title and textarea fields.
        docRef.get().then(function(doc) {
            if (doc && doc.exists) {
                const userData = doc.data();
                noteTitle.value = `${userData.title}`;
                noteText.value = `${userData.Note}`;
            } else {
                console.log("doc doesn't exists.");
            }
        }).catch(function(err) {
            console.log(`get err: ${err}`);
        });

        const innerSaveBtn = document.getElementById("innerSaveBtn");
        innerSaveBtn.addEventListener("click", ()=> {
            console.log(`${noteTitle.value} and ${noteText.value}`);
                    docRef.set({
                        Title: `${noteTitle.value}`,
                        Text: `${noteText.value}`
                    }).then(() => {
                        console.log("success");
                        window.location = "/popup.html";
                    }).catch((err) => {
                        console.log(`Error: ${err}`);
                    });
        })
    } else {
      // No user is signed in.
      window.location = "/html-files/auth.html"
    }
});

