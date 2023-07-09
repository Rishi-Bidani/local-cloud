import express, { Router } from "express";
import _settings from "../functions/settings";
import path from "path";
import isPathValid from "@functions/pathvalidator";
import fs from "fs/promises";
import authenticator from "../middleware/authenticator";
import Logging, { ApiType } from "@functions/logging";
import zipFolder from "@functions/zip";

const settings = _settings();
const router: Router = express.Router();

router.post("/folder", authenticator, async (req: express.Request, res: express.Response) => {
    try {
        Logging.create(ApiType.POST, `created folder: ${req.body.folderName}`);
        const folderName = req.body.folderName;
        const pathname = req.body.pathname ?? "";
        const baseFolder = (await settings).uploadfolder;
        const fullPath = path.join(baseFolder, pathname, folderName);
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

router.post("/zip", authenticator, async (req: express.Request, res: express.Response) => {
    try {
        // get the path of the folder to zip
        const pathname = req.body.pathname;
        console.log("pathname:::", pathname);
        const baseFolder = (await settings).uploadfolder;
        const fullPath = path.join(baseFolder, pathname);
        // validate path
        const isValid = await isPathValid(fullPath);
        if (!isValid) {
            return res.status(500).send("Error zipping folder.");
        }
        // zip the folder
        res.send("zipping folder, this may take a while.");
        await zipFolder(fullPath);
    } catch (error) {
        console.log(error);
        // check is res has been sent
        if (!res.headersSent) {
            res.status(500).send("Error zipping folder.");
        }
    }
});

export { router };
