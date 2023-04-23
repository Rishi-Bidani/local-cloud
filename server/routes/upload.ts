import express from "express";
import multer from "multer";
import MulterOptions from "../middleware/multersettings";
import _settings from "@functions/settings";
import authenticator from "../middleware/authenticator";

import Logging, { ApiType } from "@functions/logging";

const settings = _settings();
// const storage = multer.diskStorage({
//     destination: async () => (await settings).tempfolder,
//     filename: async (req, file, cb) => {
//         console.log("reached here 1");
//         // validate file path
//         const pathname = req.body.pathname;
//         const baseFolder = (await settings).baseFolder;
//         const fullPath = path.join(baseFolder, pathname);
//         const isValid = await isPathValid(fullPath);
//         if (!isValid) {
//             return;
//         }

//         cb(null, file.originalname);
//     },
// });

const multerOptions = {
    destination: MulterOptions.destination,
    filename: MulterOptions.filename,
    // fileFilter: MulterOptions.fileFilter,
    onerror: MulterOptions.onerror,
};

const storage = multer.diskStorage(multerOptions);

const router = express.Router();
const upload = multer({ storage: storage }).any();

router.post("/", authenticator, async (req: express.Request, res: express.Response) => {
    const canUpload = res.locals.permissions.canUpload;
    if (!canUpload) return res.status(403).send("Not enough permissions");

    upload(req, res, async (err) => {
        // log the file that are being uploaded
        const files = req.files as Express.Multer.File[];
        files.forEach((file) => {
            Logging.upload(ApiType.POST, file.originalname);
        });

        if (err) {
            Logging.upload(ApiType.POST, "[ERROR] Error uploading file");
            res.status(500).send("Error uploading file.");
        } else {
            res.status(200).send("File uploaded successfully.");
        }
    });

    // upload(req, res, async (err) => {
    //     if (err) {
    //         res.status(500).send("Error uploading file.");
    //     } else {
    //         console.log("reached here");
    //         const pathname = req.body.pathname;
    //         const baseFolder = (await settings).baseFolder;
    //         const fullPath = path.join(baseFolder, pathname);
    //         const files = req.files as Express.Multer.File[];
    //         // validate fullpath
    //         const isValid = await isPathValid(fullPath);
    //         if (!isValid) {
    //             return;
    //         }
    //         // move files from temp to destination
    //         for await (const file of files) {
    //             const tempPath = file.path;
    //             const targetPath = path.join(fullPath, file.originalname);
    //             try {
    //                 await fs.rename(tempPath, targetPath);
    //             } catch (err) {
    //                 res.status(500).send("Error uploading file.");
    //                 return;
    //             }
    //         }
    //         // files.forEach((file) => {
    //         //     const tempPath = file.path;
    //         //     const targetPath = path.join(fullPath, file.originalname);
    //         //     await
    //         //     // fs.rename(tempPath, targetPath, (err) => {
    //         //     //     if (err) {
    //         //     //         res.status(500).send("Error uploading file.");
    //         //     //     }
    //         //     // });
    //         // });
    //         res.status(200).send("File uploaded successfully.");
    //     }
    // });
});

export { router };
