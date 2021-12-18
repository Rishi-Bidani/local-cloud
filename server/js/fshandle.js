import * as fs from 'fs'
import * as fsp from 'fs/promises';
import * as path from "path";

// Colours for console
import { red, blue, green } from "./globalvariables.js"


// =========================== PKG- cjs ===========================
// const fs = require("fs");
// const fsp = require("fs/promises");
// // const fse = require("fs-extra");
// const path = require("path");
// const { red, blue, green } = require("./globalvariables.js");
// ================================================================

class fshandle {
    // return files and folders
    static async getFilesAndFolders(getPath) {
        const files = [];
        const folders = [];
        const allRead = await fsp.readdir(getPath, { withFileTypes: true });
        for (let read of allRead) {
            if (read.isFile()) {
                const fileName = read.name;
                const fileExtension = path.extname(read.name);
                const fileSize = parseFloat(fs.statSync(path.join(getPath, fileName)).size / 1024).toFixed(3);
                files.push({ fileName, fileExtension, fileSize });
            } else if (read.isDirectory()) {
                folders.push(read.name);
            }
        }
        return { files, folders }
    }

    // Make folder
    static async makeFolder(forPath) {
        // Additional options Specifying mode
        const options = {
            mode: 0o2775,
        };
        try {
            // return await fse.ensureDir(forPath, options);
            return await fsp.mkdir(forPath)
        } catch (err) {
            console.log(red("Folder not created: " + err))
        }
    }

    // Move files
    static async move(file, destination) {
        try {
            if (file !== destination) {
                // await fse.move(file, destination, { overwrite: true });
                return await fsp.rename(file, destination);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // delete folder
    static async deleteFolder(forPath) {
        try {
            // await fse.remove(forPath)
            return await fsp.rmdir(forPath)
        } catch (err) {
            console.error(err)
        }
    }

    // delete file
    static async deleteFile(forPath) {
        try {
            // await fse.remove(forPath);
            return await fsp.unlink(forPath);
        } catch (err) {
            console.log(red("ERROR: ", red))
        }
    }

    // Exist
    static existsSync(forPath) {
        return fs.existsSync(forPath)
    }

    // check if path is a directory
    static async isDir(forPath) {
        try {
            const stat = await fsp.lstat(forPath);
            const statIsDir = stat.isDirectory();
            const exists = fs.existsSync(forPath);
            return statIsDir && exists;
        } catch (err) {
            console.log(red("ERROR: " + err))
        }
    }

    // check is path is a file
    static async isFile(forPath) {
        try {
            const stat = await fsp.lstat(forPath);
            const statIsFile = stat.isFile();
            const exists = fs.existsSync(forPath);
            return statIsFile && exists
        } catch (err) {
            console.log(red("ERROR: ", err))
        }
    }

}


export { fshandle };
// module.exports = fshandle;