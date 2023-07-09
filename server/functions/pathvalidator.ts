// imports
import path from "path";
import _settings from "./settings";
import fs from "fs/promises";

const settings = _settings();

async function isPathValid(pathname: string): Promise<boolean> {
    const baseFolder = (await settings).basefolder;
    // const fullPath = path.join(baseFolder, pathname);
    const isPathValid = pathname.startsWith(baseFolder);
    return isPathValid;
}

export async function doesPathExist(pathname: string): Promise<boolean> {
    try {
        await fs.access(pathname);
        return true;
    } catch (error) {
        return false;
    }
}

export default isPathValid;
