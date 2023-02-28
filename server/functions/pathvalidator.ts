// imports
import path from "path";
import _settings from "../functions/settings.js";

const settings = _settings();

async function isPathValid(pathname: string): Promise<boolean> {
    const baseFolder = (await settings).baseFolder;
    const fullPath = path.join(baseFolder, pathname);
    const isPathValid = fullPath.startsWith(baseFolder);
    return isPathValid;
}

export default isPathValid;