import type { Request } from "express";

import _settings from "../functions/settings";
import * as path from "path";
import isPathValid from "../functions/pathvalidator";
import { FileFilterCallback } from "multer";
const settings = _settings();

export default class MulterOptions {
    // Set the destination to the path specified in the request
    static async destination(
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) {
        // validate file path
        const pathname = decodeURI(req.body?.pathname);
        const baseFolder = (await settings).uploadfolder;
        const fullPath = path.join(baseFolder, pathname);
        return callback(null, fullPath);
    }

    // Set the filename to the original name of the uploaded file
    static async filename(
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) {
        callback(null, file.originalname);
    }

    static async fileFilter(req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
        // check file path
        console.log("filter file");
        const pathname = req.body?.pathname;
        const baseFolder = (await settings).uploadfolder;
        const fullPath = path.join(baseFolder, pathname);
        console.log(fullPath);
        const isValid = await isPathValid(fullPath);
        if (!isValid) callback(null, false);
        callback(null, true);
    }

    static onerror(err: any, next: (arg0: any) => void) {
        console.log("error", err);
        next(err);
    }
}
