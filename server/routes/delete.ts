import express from "express";
const router = express.Router();
import path from "path";
import authenticator from "../middleware/authenticator";
import fs from "fs/promises";
import _settings from "@functions/settings";
import Logging, { ApiType } from "@functions/logging";

const settings = _settings();

class DeleteError extends Error {
    httpCode: number;

    constructor(httpCode: number, message: string) {
        super(message);
        this.httpCode = httpCode;
        this.name = "DeleteError";
    }
}

router.delete("/", authenticator, async (req: express.Request, res: express.Response) => {
    const pathname = req.body.pathname;
    const baseFolder = (await settings).uploadfolder;
    const fullPath = path.join(baseFolder, pathname);

    Logging.delete(ApiType.DELETE, `deleting file: ${fullPath}`);
    try {
        const permissions = res.locals.permissions;
        if (!permissions.canDeleteFile) {
            throw new DeleteError(403, "You do not have permission to delete files.");
        }

        await fs.unlink(fullPath);
        return res.status(200).send("File deleted successfully.");
    } catch (error) {
        Logging.error(ApiType.DELETE, `error deleting file: ${fullPath} - ${error}`);

        if (error instanceof DeleteError) {
            console.log("error: ", error);
            return res.status(error.httpCode).send(error.message);
        }

        return res.status(500).send("Error deleting file.");
    }
});

router.delete("/folder", authenticator, async (req: express.Request, res: express.Response) => {
    // get the path of the folder to delete
    const pathname = req.body.pathname;
    const baseFolder = (await settings).uploadfolder;
    const fullPath = path.join(baseFolder, pathname);

    Logging.delete(ApiType.DELETE, `deleting folder: ${fullPath}`);

    try {
        // check if user has permission to delete folder
        const permissions = res.locals.permissions;
        if (!permissions.canDeleteFile) {
            throw new DeleteError(403, "You do not have permission to delete folders.");
        }
        // check if folder exists
        const folderExists = await fs.stat(fullPath);
        if (!folderExists.isDirectory()) {
            throw new DeleteError(400, "Folder does not exist.");
        }
        // delete folder
        await fs.rmdir(fullPath, { recursive: true });
        return res.status(200).send("Folder deleted successfully.");
    } catch (error) {
        Logging.error(ApiType.DELETE, `error deleting folder: ${fullPath} - ${error}`);
        // catch errors
        // persmission errors
        if (error instanceof DeleteError && error.httpCode === 403) {
            return res.status(403).send("Permission Error: " + error.message);
        }
        // folder does not exist
        if (error instanceof DeleteError && error.httpCode === 400) {
            return res.status(400).send("Folder does not exist.");
        }
        // other errors
        return res.status(500).send("Error deleting folder.");
    }
});

export { router };
