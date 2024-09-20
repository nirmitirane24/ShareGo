const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/files');
const { v4: uuid4 } = require('uuid');
const crypto = require('crypto-js');
const fs = require('fs');

// Multer setup
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 } // 100MB limit
}).single('myfile');

// Route to upload and encrypt file
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: 'All fields are required.' });
        }

        if (err) {
            return res.status(500).send({ error: err.message });
        }

        // Create encryption key and encrypt file
        const encryptionKey = crypto.lib.WordArray.random(16).toString();
        const fileBuffer = fs.readFileSync(req.file.path);
        const encryptedFile = crypto.AES.encrypt(fileBuffer.toString('base64'), encryptionKey).toString();

        // Store encrypted file on disk (overwrite original file with encrypted version)
        fs.writeFileSync(req.file.path, encryptedFile);

        // Save file metadata and encryption details in the database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size,
            sender: req.body.sender,
            receiver: req.body.receiver,
            key: encryptionKey // Store the encryption key
        });
        const response = await file.save();

        // Send the file link (uuid) to the user
        return res.json({ fileLink: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
    });
});

module.exports = router;
