// Copyright 2020-2021 Rishi Bidani
import express from "express";
import multer from "multer"
import { fshandle as FileHandle } from "../js/fshandle.js";
import * as fs from "fs/promises"
import * as path from "path";
import { UPLOAD_TEMP, UPLOAD_FOLDER, checkBodyPath, red, blue } from "../js/globalvariables.js";


const router = express.Router();

// Setup storage for multer middleware
const storage = multer.diskStorage({
    destination: UPLOAD_TEMP,
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).any();

// Create new folder
router.post("/create/folder", checkBodyPath, async (req, res) => {
    const relativePath = req.body.relPath;
    const folderName = req.body.folderName;
    const absolutePath = path.join(UPLOAD_FOLDER, relativePath);
    const fullPath = path.join(absolutePath, folderName)
    console.log(fullPath)

    try {
        await FileHandle.makeFolder(fullPath);
        console.log(blue("Created folder: ", fullPath))
        res.status(200).send("create folder")
    } catch (err) {
        res.status(500).send(err)
    }
})

// Upload files
router.post("/upload", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(red(err));
            res.status(500).send("ERROR");
        }
        if (!req.files) {
            res.status(500).send("Possible error: no files found");
        } else {
            // All req content is valid here => Perform all file based logic here
            const initialPath = req.files[0].path;
            const finalPath = path.join(UPLOAD_FOLDER, req.body.relPath, req.files[0].originalname);
            console.log(blue("Uploading: ", finalPath))
            if (!finalPath.includes(UPLOAD_FOLDER)) res.status(403).send("RESTRICTED FOLDER")
            await FileHandle.move(initialPath, finalPath);
            res.json("Received File");
        }
    })
})

export { router }