import express from "express";
const router = express.Router();
import { join, normalize } from "path";
import { access } from "fs/promises";

import { getFiles, getFolders } from "../functions/filesfolders";
import authenticator from "../middleware/authenticator";

import _settings from "../functions/settings";
import { Dirent } from "fs";
const settings = _settings();

type FileOrFolder = Dirent[] | Files | null;

import Logging, { ApiType } from "../functions/logging";

interface File {
    name: string;
    size: number;
}
type Files = File[];

router.get(":pathname(/*)?", authenticator, async (req, res) => {
    const uploadFolder = (await settings).uploadfolder;
    const pathname = join(uploadFolder, req.params.pathname ?? "");
    Logging.navigate(ApiType.GET, pathname);

    // if path doesn't exist, return 404
    const pathnameExists = await access(pathname)
        .then(() => true)
        .catch(() => false);
    if (!pathnameExists) {
        res.status(404).json({ error: "Path not found" });
        return;
    }

    // check if accounts exist
    const hideList =
        res.locals?.account?.hide.map((item: string) => join(uploadFolder, normalize(item))) ?? [];

    const files = await getFiles(pathname);
    const folders = (await getFolders(pathname))?.filter((folder) => {
        const folderPath = join(pathname, folder.name);
        return !hideList.includes(folderPath);
    });
    res.json({ files, folders });
});

export { router };
