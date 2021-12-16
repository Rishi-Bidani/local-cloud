// Copyright 2021-2022 Rishi Bidani
import express from "express";

const router = express.Router();
import path from "path";
import {UPLOAD_FOLDER, checkPath, green, red} from "../js/globalvariables.js";
import {fshandle as fsh} from "../js/fshandle.js";

// Get directories
router.get("/files-and-folders", checkPath, async (req, res) => {
    try {
        const relativePath = req.query.relPath;
        const fullPath = path.join(UPLOAD_FOLDER, relativePath);
        console.log(green("Accessing Folder: ", fullPath));
        const FandF = await fsh.getFilesAndFolders(fullPath);
        res.json(FandF);
    } catch (err) {
        console.log(err)
        res.status(500).json("ERROR");
    }
})

// Download file
router.get("/download-file", checkPath, async (req, res) => {
    try {
        const relativePath = req.query.relPath;
        const fullPath = path.join(UPLOAD_FOLDER, relativePath);
        console.log(fullPath)
        res.sendFile(fullPath, (err) => {
            if (err) console.log(red(err))
        })
    } catch (err) {
        console.log(red(err))
    }
})
export {router}