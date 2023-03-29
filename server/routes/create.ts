import express, { Router } from "express";
import _settings from "../functions/settings";
import path from "path";
import isPathValid from "../functions/pathvalidator";
import fs from "fs/promises";

const settings = _settings();
const router: Router = express.Router();

router.post("/folder", async (req: express.Request, res: express.Response) => {
    try {
        const folderName = req.body.folderName;
        const pathname = req.body.pathname ?? "";

        console.log("folderName: ", folderName);
        console.log("pathname: ", pathname);

        const baseFolder = (await settings).uploadfolder;
        const fullPath = path.join(baseFolder, pathname, folderName);
        console.log("fullPath: ", fullPath);
        if (await isPathValid(fullPath)) {
            await fs.mkdir(fullPath);
            return res.status(200).send("Folder created successfully.");
        }
        return res.status(500).send("Error creating folder.");
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).send("Error creating folder.");
    }
});

export { router };
