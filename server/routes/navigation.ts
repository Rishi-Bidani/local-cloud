import express from "express";
const router = express.Router();

import path from "path";
import { homedir } from "os";
import isPathValid from "../functions/pathvalidator.js";

import * as fs from "fs/promises";

// import _settings from "../functions/settings.js";
// const settings = _settings();

interface File {
    name: string;
    size: number;
}

type Files = File[];

// get names of files and folders in a directory
async function getFiles(pathname: string) {
    if (!(await isPathValid(pathname))) {
        return null;
    }

    // get files
    const readpath = await fs.readdir(pathname, { withFileTypes: true });
    const _files: Promise<File>[] = readpath
        .filter((file) => file.isFile())
        .map(async (file) => {
            const fileName = file.name;
            const fileSize = (await fs.stat(path.join(pathname, file.name))).size;
            const fileObject: File = {
                name: fileName,
                size: fileSize,
            };
            return fileObject;
        });

    const files: Files = await Promise.all(_files);
    return files;
}

getFiles(path.join(homedir(), "Downloads")).then((files) => {
    console.log(files);
});
