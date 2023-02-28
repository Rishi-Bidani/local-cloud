import { join } from "path";
import { readFile } from "fs/promises";
import { parse as yamlparse, stringify as yamlstringify } from "yaml";
import { homedir } from "os";

const SETTINGS_PATH = join(__dirname, "..", "settings.yaml");

async function settings() {
    const settings = await readFile(SETTINGS_PATH, "utf8");
    const parsedSettings = await yamlparse(settings);
    parsedSettings.basefolder = join(parsedSettings.basefolder ?? homedir(), "localcloud");
    parsedSettings.uploadfolder = join(parsedSettings.basefolder, "data");
    parsedSettings.tempfolder = join(parsedSettings.basefolder, "temp");
    console.log(parsedSettings);
    return parsedSettings;
}

export default settings;
