// Copyright 2021-2022 Rishi Bidani
import express from "express";

const router = express.Router();
import path from "path";
import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';

import { UPLOAD_FOLDER, checkPath, green, red, blue } from "../js/globalvariables.js";
import { fshandle as fsh } from "../js/fshandle.js";

// Get directories
router.get("/files-and-folders", checkPath, async (req, res) => {
    try {
        const relativePath = req.query.relPath;
        const fullPath = path.join(UPLOAD_FOLDER, relativePath);
        console.log(green("Accessing Folder: ", fullPath));
        const FandF = await fsh.getFilesAndFolders(fullPath);
        res.json(FandF);
    } catch (err) {
        console.log(red(err));
        res.status(500).json("ERROR");
    }
})

// Download file
router.get("/download-file", checkPath, async (req, res) => {
    try {
        const relativePath = req.query.relPath;
        const fullPath = path.join(UPLOAD_FOLDER, relativePath);
        console.log(green("Downloading: ", fullPath))
        res.sendFile(fullPath, (err) => {
            if (err) console.log(red(err))
        })
    } catch (err) {
        console.log(red(err))
    }
})

// Download folder
router.get("/download-folder", checkPath, async (req, res) => {
    const relativePath = req.query.relPath;
    const folderName = req.query.folderName;
    const fullPath = path.join(UPLOAD_FOLDER, relativePath, folderName);
    const savePath = path.join(UPLOAD_FOLDER, relativePath, folderName + ".zip");
    try {
        if (fsh.existsSync(savePath)) await fsh.deleteFile(savePath);
        console.log(green("Zipping and downloading folder: ", fullPath));
        await zip(fullPath, savePath, { compression: COMPRESSION_LEVEL.high })
        res.sendFile(savePath)
    } catch (err) {
        console.log(red(err))
        res.status(500)
    }
})

export { router }