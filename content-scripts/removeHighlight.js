// Add tags around the selected text
function getSelectedText(){
    if (document.getSelection)
        return document.getSelection();
}

var selection = getSelectedText();
var selection_text = selection.toString();

var range = selection.getRangeAt(0);

var selectedElement = document.getSelection().anchorNode.parentElement;

selectedElement.classList.remove("xabc"); // Add Custom CSS class
selectedElement.style.background = "inherit"; // Add Custom inline style to highlight text



// Now collecting the highlighted text again and storing in firestore
// Get highlighted text in an array.
highlightedTextGroup = document.getElementsByClassName("xabc");
var highlightedTextsString = "";
for (i=0; i < highlightedTextGroup.length; i++) {
    console.log(highlightedTextGroup[i].innerText);
    highlightedTextsString = `${highlightedTextsString} \n${highlightedTextGroup[i].innerText}`
}

console.log(highlightedTextsString);
// Sending data to background.js
chrome.runtime.sendMessage({command: "post", data: [window.location.href, highlightedTextsString]});

