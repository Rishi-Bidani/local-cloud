// Copyright 2020-2021 Rishi Bidani
import express from "express";

const router = express.Router();
import path from "path";
import {UPLOAD_TEMP, UPLOAD_FOLDER, checkPath, red} from "../js/globalvariables.js";
import {fshandle as fsh} from "../js/fshandle.js";


// Delete file
router.delete("/file", checkPath, async (req, res) => {
    const data = req.query;
    const forPath = path.join(UPLOAD_FOLDER, data.relPath, data.fileName);
    if (!await fsh.isFile(forPath)) res.status(404).send("file not found")
    try {
        await fsh.deleteFile(forPath);
        console.log(red("DELETED: " + forPath))
        res.status(200).send("DELETED");
    } catch (err) {
        console.log(red("ERROR: " + err))
    }
})


// Delete folder
router.delete("/folder", checkPath, async (req, res) => {
    const data = req.query;
    const forPath = path.join(UPLOAD_FOLDER, data.relPath, data.folderName);
    if (!await fsh.isDir(forPath)) res.status(404).send("folder not found")
    try {
        await fsh.deleteFolder(forPath);
        console.log(red("DELETED everything inside: " + forPath))
        res.status(200).send("DELETED");
    } catch (err) {
        console.log(red("ERROR: " + err))
    }
})

export {router}