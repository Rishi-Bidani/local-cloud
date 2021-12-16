import chalk from 'chalk';
import * as os from "os";
import * as path from "path";

// Console colours
export const green = chalk.green;
export const red = chalk.red;
export const blue = chalk.blue;
export const cyan = chalk.cyan;

// Important folder
export const UPLOAD_FOLDER = path.join(os.homedir(), "HomeCloud");
export const HOME_DIR = path.join(os.homedir());


// middleware
export const checkPath = (req, res, next) => {
    if (req.query.relPath === null) res.status(403).send("ERROR");
    const relativePath = req.query.relPath;
    const absolutePath = path.join(UPLOAD_FOLDER, relativePath)
    if (absolutePath.includes(UPLOAD_FOLDER)) {
        next()
    } else {
        res.status(403)
    }
}

export const checkBodyPath = (req, res, next) => {
    if (req.body.relPath === null) res.status(403).send("ERROR");
    const relativePath = req.body.relPath;
    const absolutePath = path.join(UPLOAD_FOLDER, relativePath)
    if (absolutePath.includes(UPLOAD_FOLDER)) {
        next()
    } else {
        res.status(403)
    }
}