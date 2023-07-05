import path from "path";
import { homedir } from "os";
import isPathValid from "./pathvalidator";
import * as fs from "fs/promises";
import { Dirent } from "fs";

import _settings from "./settings";
const settings = _settings();
interface File {
    name: string;
    size: number;
}

type Files = File[];

// get names of files and folders in a directory
async function getFiles(pathname: string) {
    if (!(await isPathValid(pathname))) {
        return null;
    }
    // get files
    const readpath = await fs.readdir(pathname, { withFileTypes: true });
    const _files: Promise<File>[] = readpath
        .filter((file) => file.isFile())
        .map(async (file) => {
            const fileName = file.name;
            const fileSize = (await fs.stat(path.join(pathname, file.name))).size;
            const fileObject: File = {
                name: fileName,
                size: fileSize,
            };
            return fileObject;
        });

    const files: Files = await Promise.all(_files);
    return files;
}

async function getFolders(pathname: string) {
    if (!(await isPathValid(pathname))) {
        return null;
    }

    // get folders
    const readpath = await fs.readdir(pathname, { withFileTypes: true });
    const folders = readpath.filter((file) => file.isDirectory());
    return folders;
}

// getFiles(path.join(homedir(), "Downloads")).then((files) => {
//     console.log(files);
// });

type FileOrFolder = Dirent[] | Files | null;

async function removeItemsFromList<FileFolder>(
    primaryList: FileFolder[],
    removeList: string[],
    attr: string,
    pathname: string
): Promise<FileFolder[]> {
    const filteredList = primaryList.filter((_item: FileFolder) => {
        const item: string = path.resolve(
            pathname,
            (attr.length === 0 ? _item : _item[attr as keyof FileFolder]) as string
        );

        return !removeList.some((removeItem) => {
            if (attr.length === 0) return item.startsWith(removeItem);
            return item.startsWith(removeItem);
        });
    });
    return filteredList;
}

export { getFiles, getFolders, removeItemsFromList };
