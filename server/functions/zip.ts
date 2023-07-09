import { zip } from "zip-a-folder";
import path from "path";
import { doesPathExist } from "./pathvalidator";

async function zipFolder(fullPath: string): Promise<any> {
    // validate if zip folder exists
    const zipFolderExists = await doesPathExist(
        path.join(fullPath, `${path.basename(fullPath)}.zip`)
    );
    if (zipFolderExists) {
        // add a number to the end of the zip folder name
        let i = 1;
        let zipFolderName;
        while (zipFolderExists) {
            zipFolderName = path.join(fullPath, "..", `${path.basename(fullPath)}(${i}).zip`);
            const zipFolderExists = await doesPathExist(zipFolderName);
            if (!zipFolderExists) break;
            i++;
        }
        const source = fullPath;
        const destination = zipFolderName;
        return zip(source, destination);
    }
    const source = fullPath;
    const destination = path.join(fullPath, "..", `${path.basename(fullPath)}.zip`);
    return zip(source, destination);

    // return zip(fullPath, path.join(fullPath, `${path.basename(fullPath)}.zip`));
}

export default zipFolder;
