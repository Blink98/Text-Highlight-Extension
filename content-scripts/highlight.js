// Add tags around the selected text
function getSelectedText(){
    if (document.getSelection)
        return document.getSelection();
}

var selection = getSelectedText();
var selection_text = selection.toString();

// Add a span around the selected text
var span = document.createElement('SPAN');
span.className += "xabc"; // Add Custom CSS class
span.style.background = "yellow"; // Add Custom inline style to highlight text
span.textContent = selection_text;

var range = selection.getRangeAt(0);
range.deleteContents();
range.insertNode(span);

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

