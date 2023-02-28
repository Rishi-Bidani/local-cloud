import express from "express";
import multer from "multer";
import _settings from "../functions/settings";
import * as path from "path";
import authenticator from "../middleware/authenticator";
import * as fs from "fs/promises";
import isPathValid from "../functions/pathvalidator";

const settings = _settings();
const storage = multer.diskStorage({
    destination: async () => (await settings).tempfolder,
    filename: async (req, file, cb) => {
        // validate file path
        const pathname = req.body.pathname;
        const baseFolder = (await settings).baseFolder;
        const fullPath = path.join(baseFolder, pathname);
        const isValid = await isPathValid(fullPath);
        if (!isValid) {
            return;
        }

        cb(null, file.originalname);
    },
});

const router = express.Router();
const upload = multer({ storage: storage }).any();

router.post("/", authenticator, async (req: express.Request, res: express.Response) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(500).send("Error uploading file.");
        } else {
            const pathname = req.body.pathname;
            const baseFolder = (await settings).baseFolder;
            const fullPath = path.join(baseFolder, pathname);
            const files = req.files as Express.Multer.File[];
            // validate fullpath
            const isValid = await isPathValid(fullPath);
            if (!isValid) {
                return;
            }

            // files.forEach((file) => {
            //     const tempPath = file.path;
            //     const targetPath = path.join(fullPath, file.originalname);
            //     await
            //     // fs.rename(tempPath, targetPath, (err) => {
            //     //     if (err) {
            //     //         res.status(500).send("Error uploading file.");
            //     //     }
            //     // });
            // });
            res.status(200).send("File uploaded successfully.");
        }
    });
});

export { router };
