/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

document.querySelector(".btn-generate-qr-code").addEventListener("click", () => {
    let URLinput = document.querySelector(".url-input");
    generateQRCode(URLinput.value);
});

function generateQRCode(url) {
    inquirer
    .then( () => {

        var qrPng = qr.image(url, {type: "png"});
        qrPng.pipe(fs.createWriteStream("qrcode.png"));


        /* fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        }); */
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
}
