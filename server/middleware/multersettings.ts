import type { Request } from "express";

import _settings from "@functions/settings";
import * as path from "path";
import isPathValid from "@functions/pathvalidator";
import { FileFilterCallback } from "multer";
const settings = _settings();

import * as fs from "fs/promises";

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
        const pathname = decodeURI(req.body?.pathname);
        const baseFolder = (await settings).uploadfolder;
        const fullPath = path.join(baseFolder, pathname, file.originalname);

        // check if the file already exists
        const fileExists = await fs
            .access(fullPath)
            .then(() => true)
            .catch(() => false);
        if (fileExists) {
            // add timestamp to original filename
            // timstamp format: DDMMYYYYHHMMSS
            let timestamp = new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            // remove all non-alphanumeric characters replacing them with _
            timestamp = timestamp.replace(/[^a-zA-Z0-9]/g, "_");
            console.log("timestamp: ", timestamp);
            const filename = file.originalname.split(".")[0];
            const extension = file.originalname.split(".")[1];
            const newFilename = `${filename}_${timestamp}.${extension}`;
            return callback(null, newFilename);
        } else {
            // file does not exist
            callback(null, file.originalname);
        }
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
