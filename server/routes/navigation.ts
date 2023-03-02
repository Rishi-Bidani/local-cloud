import express from "express";
const router = express.Router();
import { join } from "path";
import { access } from "fs/promises";

import { getFiles, getFolders } from "../functions/filesfolders";

import _settings from "../functions/settings";
const settings = _settings();

router.get("/:pathname?", async (req, res) => {
    const pathname = join((await settings).uploadfolder, req.params.pathname ?? "");
    console.log("pathname: " + pathname);
    // if path doesn't exist, return 404
    const pathnameExists = await access(pathname)
        .then(() => true)
        .catch(() => false);
    if (!pathnameExists) {
        res.status(404).json({ error: "Path not found" });
        return;
    }

    const files = await getFiles(pathname);
    const folders = await getFolders(pathname);
    res.json({ files, folders });
});

export { router };
