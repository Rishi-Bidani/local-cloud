// get the settings
import _settings from "./settings";
const settings = _settings();

import * as fs from "fs/promises";

import * as path from "path";

async function createStorageFolders() {
    const baseFolder = (await settings).basefolder;
    const dataFolder = path.join(baseFolder, "data");
    const tempFolder = path.join(baseFolder, "temp");

    // create the folders if they don't exist
    const dataFolderExists = await fs
        .access(dataFolder)
        .then(() => true)
        .catch(() => false);
    const tempFolderExists = await fs
        .access(tempFolder)
        .then(() => true)
        .catch(() => false);

    if (!dataFolderExists) {
        await fs.mkdir(dataFolder, { recursive: true });
    }
    if (!tempFolderExists) {
        await fs.mkdir(tempFolder, { recursive: true });
    }
}

export default createStorageFolders;
