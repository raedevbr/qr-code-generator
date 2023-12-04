/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import qr from "qr-image";
import bodyParser from 'body-parser';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '..', 'Frontend');
const PORT = 3000;
const app = express();

app.use(express.static(frontendDir));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
});

app.post("/", (req, res) => {
    const url = req.body.url;

    const qrPng = qr.image(url, {type: "png"});
    const qrFilePath = path.join(__dirname, 'qrcode.png');

    qrPng.pipe(fs.createWriteStream(qrFilePath))
    .on('finish', () => {
        res.download(qrFilePath, 'qrcode.png', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error downloading the file');
            } else {
                // Deletes file from server after downloading
                fs.unlinkSync(qrFilePath);
            }
        })
    })
    .on('error', (err) => {
        console.error(err);
        res.status(500).send('Error generating QR Code');
    });
});


app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});
