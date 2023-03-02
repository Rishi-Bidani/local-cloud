// imports
import path from "path";
import _settings from "./settings";

const settings = _settings();

async function isPathValid(pathname: string): Promise<boolean> {
    const baseFolder = (await settings).basefolder;
    // const fullPath = path.join(baseFolder, pathname);
    const isPathValid = pathname.startsWith(baseFolder);
    return isPathValid;
}

export default isPathValid;
