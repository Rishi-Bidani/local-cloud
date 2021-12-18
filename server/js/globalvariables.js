// Copyright Rishi 2021-22
import chalk from 'chalk';
import * as os from "os";
import * as path from "path";

// =========================== PKG- cjs ===========================
// const chalk = require("chalk");
// const os = require("os");
// const path = require("path");
// =================================================================

// Console colours
const green = chalk.green;
const red = chalk.red;
const blue = chalk.blue;
const cyan = chalk.cyan;

// Important folder
const UPLOAD_FOLDER = path.join(os.homedir(), "HomeCloud", "DATA");
const UPLOAD_TEMP = path.join(os.homedir(), "HomeCloud", "temp");
const HOME_DIR = path.join(os.homedir());


// middleware
const checkPath = (req, res, next) => {
    if (req.query.relPath === null) res.status(403).send("ERROR");
    const relativePath = req.query.relPath;
    const absolutePath = path.join(UPLOAD_FOLDER, relativePath)
    if (absolutePath.includes(UPLOAD_FOLDER)) {
        next()
    } else {
        console.log(red("\n Tried accessing: ", absolutePath, "\n"));
        res.status(403)
    }
}

const checkBodyPath = (req, res, next) => {
    if (req.body.relPath === null) res.status(403).send("ERROR");
    const relativePath = req.body.relPath;
    const absolutePath = path.join(UPLOAD_FOLDER, relativePath)
    if (absolutePath.includes(UPLOAD_FOLDER)) {
        next()
    } else {
        console.log(red("\n Tried accessing: ", absolutePath, "\n"));
        res.status(403)
    }
}

export { green, red, blue, cyan, UPLOAD_FOLDER, UPLOAD_TEMP, HOME_DIR, checkPath, checkBodyPath }
// module.exports = { green, red, blue, cyan, UPLOAD_FOLDER, UPLOAD_TEMP, HOME_DIR, checkPath, checkBodyPath }
