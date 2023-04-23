import express from "express";
const router = express.Router();
import path from "path";
import authenticator from "../middleware/authenticator";
import _settings from "../functions/settings";
import fs from "fs/promises";
import Logging, { ApiType } from "../functions/logging";

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
    console.log("reached");
    const pathname = req.body.pathname;
    const baseFolder = (await settings).uploadfolder;
    const fullPath = path.join(baseFolder, pathname);

    console.log("fullPath: ", fullPath);

    const permissions = res.locals.permissions;
    if (!permissions.canDeleteFile) {
        throw new DeleteError(403, "You do not have permission to delete files.");
    }

    Logging.delete(ApiType.DELETE, `deleting file: ${fullPath}`);
    try {
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

export { router };
