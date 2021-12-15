import * as fs from 'fs'
import * as fsp from 'fs/promises';
import * as fse from "fs-extra";
import * as path from "path";

// Colours for console
import {red, blue, green} from "./globalvariables.js"


export class fshandle {
    // return files and folders
    static async getFilesAndFolders(getPath) {
        const files = [];
        const folders = [];
        const allRead = await fsp.readdir(getPath, {withFileTypes: true});
        for (let read of allRead) {
            if (read.isFile()) {
                const fileName = read.name;
                const fileExtension = path.extname(read.name);
                const fileSize = parseFloat(fs.statSync(path.join(getPath, fileName)).size / 1024).toFixed(3);
                files.push({fileName, fileExtension, fileSize});
            } else if (read.isDirectory()) {
                folders.push(read.name);
            }
        }
        return {files, folders}
    }

    // Make folder
    static async makeFolder(getPath) {
        try {
            return await fse.ensureDir(getPath);
        } catch (err) {
            console.log(red("Folder not created: " + err))
        }
    }

    // save files

}
