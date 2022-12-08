// JavaScript Document
const canvas = document.querySelector("canvas")
const saveBtn = document.getElementById("saveBtn")
const upload_input = document.getElementById("upload_input")

const signaturePad = new SignaturePad(canvas);

signaturePad.penColor = "rgb(66, 133, 244)";


function getBlob(dataURL, filename) {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);
    upload_input.value = dataURL

    // var a = document.createElement("a");
    // a.style = "display: none";   
    // a.href = url;
    // a.download = filename;

    // document.body.appendChild(a);
    // a.click();

    // window.URL.revokeObjectURL(url);
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });

}


saveBtn.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide a signature first.");
    } else {
        var dataURL = signaturePad.toDataURL();
        // upload_input.value = dataURL
        getBlob(dataURL, "signature.png");
    }
});