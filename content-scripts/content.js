// Add a floating button in upper left corner
// var highlightBtn = document.createElement('div');
// highlightBtn.style.content = "H";
// highlightBtn.style.padding = "3rem";
// highlightBtn.style.background = "greenyellow";
// highlightBtn.style.color = "black";
// highlightBtn.style.position = "absolute";
// highlightBtn.style.top = "0";
// highlightBtn.style.right = "0";
// highlightBtn.style.zIndex = "9999999999";
// highlightBtn.style.position = "absolute";
// highlightBtn.style.position = "absolute";
// highlightBtn.className += "xhighlightBtn"; // Add Custom CSS class


// var firebaseConfig = {
//     apiKey: "AIzaSyB-lEpItMY87NX-o0-8-yEIIW1zF7Qh9OY",
//     authDomain: "bibly-92def.firebaseapp.com",
//     databaseURL: "https://bibly-92def.firebaseio.com",
//     projectId: "bibly-92def",
//     storageBucket: "bibly-92def.appspot.com",
//     messagingSenderId: "742355570811",
//     appId: "1:742355570811:web:92c3fa2327b98dd0c652de"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();

// // Add tags around the selected text
// function getSelectedText(){
//     if (document.getSelection)
//         return document.getSelection();
// }
    
// document.addEventListener("mouseup", function () {
//     var selection = getSelectedText();
//     var selection_text = selection.toString();

//     // How do I add a span around the selected text?
//     var span = document.createElement('SPAN');
//     span.className += "xabc"; // Add Custom CSS class
//     span.style.background = "yellow"; // Add Custom inline style to highlight text
//     span.textContent = selection_text;

//     var range = selection.getRangeAt(0);
//     range.deleteContents();
//     range.insertNode(span);

//     // Get highlighted text in an array.
//     highlightedTextGroup = document.getElementsByClassName("xabc");

//     for (i=0; i < highlightedTextGroup.length; i++) {
//         console.log(highlightedTextGroup[i].innerText);
//     }    
// });



    
// firestore.doc(`user/highlighted-texts/`).set({
//     Text: `${highlightedTextGroup[i].innerText}`
// }).then(() => {
//     console.log("success");
// }).catch((err) => {
//     console.log(`Error: ${err}`);
// });