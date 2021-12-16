// Copyright 2020-2021 Rishi Bidani
import express from "express";
import * as multer from "multer"
import * as zipper from "zip-local"
import {fshandle as FileHandle} from "../js/fshandle.js";
import * as fs from "fs/promises"
import * as path from "path";
import {HOME_DIR, UPLOAD_FOLDER, checkBodyPath} from "../js/globalvariables.js";


const router = express.Router();

// Setup storage for multer middleware
const storage = multer.diskStorage({
    destination: HOME_DIR,
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Create new folder
router.post("/create/folder", checkBodyPath, async (req, res) => {
    const relativePath = req.body.relPath;
    const folderName = req.body.folderName;
    const absolutePath = path.join(UPLOAD_FOLDER, relativePath);
    const fullPath = path.join(absolutePath, folderName)
    console.log(fullPath)

    try {
        await FileHandle.makeFolder(fullPath);
        res.status(200).send("create folder")
    } catch (err) {
        res.status(500).send(err)
    }
})


// Upload file

export {router}