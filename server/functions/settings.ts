import { join } from "path";
import { readFile } from "fs/promises";
import { parse as yamlparse, stringify as yamlstringify } from "yaml";

const SETTINGS_PATH = join(__dirname, "..", "settings.yaml");

async function settings() {
    const settings = await readFile(SETTINGS_PATH, "utf8");
    const parsedSettings = await yamlparse(settings);
    console.log(parsedSettings);
    return parsedSettings;
}

export default settings;
