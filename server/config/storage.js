const express = require('express');
const mongoDB = require('../databases/mongodb');
const mongoURI = require('../databases/mongodb').mongoURI;
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();

const conn = mongoDB.connection;

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoDB.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject)=> {
            crypto.randomBytes(16, (err, buffer) => {
                if (err) return reject(err);

                const filename = buffer.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage: storage });

router.get('/files', (req, res, next) => {
    gfs.files.find().toArray((err, files) => {
        if (err) return next(err);

        return res.json(files);
    });
});

router.get('/file/:filename', (req, res, next) => {
    gfs.files.findOne({ filename: req.params.filename } ,(err, file) => {
        if (err) return next(err);

        return res.json(file);
    });
});

router.get('/images/:filename', (req, res, next) => {
    gfs.files.findOne({ filename: req.params.filename } ,(err, file) => {
        if (err) return next(err);

        if (file) {
            if (file.contentType.match(/image\/(png|jpeg|jpg)$/)) {
                const readStream = gfs.createReadStream(file.filename);
                readStream.pipe(res);
            } else {
                res.json({ err: "It's not an image!" })
            }
        }
    });
});

module.exports = upload;
module.exports.router = router;