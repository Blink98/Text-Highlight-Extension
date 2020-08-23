// Firebase
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

const contextOptions = {
    'highlightText': 'Highlight',
    'removeHighlight': 'Remove Highlight'
};
// Inserting the context menu buttons/options into the context menu
chrome.runtime.onInstalled.addListener(function() {
    for (let key of Object.keys(contextOptions)) {
      chrome.contextMenus.create({
        id: key,
        title: contextOptions[key],
        type: 'normal',
        contexts: ["selection"]
      });
    }
});

// Run these statements after user is logged in.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var uid;

    if (user != null) {
    uid = user.uid;  // The user's ID.
    }
    console.log("uid: " + uid);

    // Run these when context menu button is clicked.
    chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
      if (clickData.menuItemId == "highlightText") {
          console.log("start");
          chrome.tabs.executeScript({
            file: "/content-scripts/highlight.js"
          });
          chrome.runtime.onMessage.addListener((msg, sender, resp) => {
            console.log(msg.data);
            const firestore = firebase.firestore();
            tabURL = msg.data[0];
            var docId = tabURL.replace(/\//g, "\\");
            console.log("Start saving in firebase." + docId);
            const docRef = firestore.doc(`Bookmarks/${uid}/bookmarks/${docId}`);
            docRef.set({
                url : msg.data[0],
                Note: msg.data[1]
            }).then(() => {
                console.log("success");
            }).catch((err) => {
                console.log(`Error: ${err}`);
            });

            console.log("End saving in firebase.");
          });

          
          console.log("Saved to Note");

        } else if (clickData.menuItemId == "removeHighlight") {
            console.log("Remove Highlight");
            chrome.tabs.executeScript({
              file: "/content-scripts/removeHighlight.js"
            });
            chrome.runtime.onMessage.addListener((msg, sender, resp) => {
              console.log(msg.data);
              const firestore = firebase.firestore();
              tabURL = msg.data[0];
              var docId = tabURL.replace(/\//g, "\\");
              console.log("Start saving in firebase." + docId);
              const docRef = firestore.doc(`Bookmarks/${uid}/bookmarks/${docId}`);
              docRef.set({
                  url : msg.data[0],
                  Note: msg.data[1]
              }).then(() => {
                  console.log("success");
              }).catch((err) => {
                  console.log(`Error: ${err}`);
              });

              console.log("End saving in firebase.");
            });
        }    
    });
  }
});