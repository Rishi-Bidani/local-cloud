import express from "express";
const router = express.Router();
import path from "path";
import { access } from "fs/promises";

import { getFiles, getFolders } from "../functions/filesfolders";
import authenticator from "../middleware/authenticator";

import _settings from "../functions/settings";
import { Dirent } from "fs";
const settings = _settings();

type FileOrFolder = Dirent[] | Files | null;

import Logging, { ApiType } from "../functions/logging";

interface File {
    name: string;
    size: number;
}
type Files = File[];

function isSubDirectory(parent: string, child: string) {
    const relative = path.relative(parent, child);
    return !relative.startsWith("..") && !path.isAbsolute(relative);
}

router.get(":pathname(/*)?", authenticator, async (req, res) => {
    const uploadFolder = (await settings).uploadfolder;
    const pathname = path.join(uploadFolder, req.params.pathname ?? "");
    Logging.navigate(ApiType.GET, pathname);

    // if path doesn't exist, return 404
    const pathnameExists = await access(pathname)
        .then(() => true)
        .catch(() => false);
    if (!pathnameExists) {
        res.status(404).json({ error: "Path not found" });
        return;
    }

    const accountName = res.locals?.accountName;
    const account = res.locals?.account;
    console.log(accountName);
    if (accountName === "admin") {
        console.log("admin");
        // admin can access everything
        const files = await getFiles(pathname);
        const folders = await getFolders(pathname);
        return res.json({ files, folders });
    } else {
        const hiddenItems =
            account?.hide.map((item: string) => {
                return path.join(uploadFolder, path.normalize(item));
            }) ?? [];

        // check if the path is hidden
        console.log(pathname, hiddenItems);
        // isHidden -> true if current path is hidden
        const isHidden = hiddenItems.some((item: string) => isSubDirectory(item, pathname));
        if (isHidden) return res.status(403).json({ error: "Not enough permissions" });

        // get list of hidden folders
        const hiddenFolders = hiddenItems.filter((item: string) => {
            return isSubDirectory(pathname, item);
        });
        const folders = (await getFolders(pathname))?.reduce((acc: Dirent[], folder: Dirent) => {
            const folderPath = path.join(pathname, folder.name);
            if (!hiddenFolders.some((item: string) => isSubDirectory(item, folderPath))) {
                acc.push(folder);
            }
            return acc;
        }, []);

        // get list of hidden files
        const hiddenFiles = hiddenItems.filter((item: string) => {
            return isSubDirectory(pathname, item);
        });

        const files = (await getFiles(pathname))?.reduce((acc: Files, file: File) => {
            const filePath = path.join(pathname, file.name);
            if (!hiddenFiles.some((item: string) => isSubDirectory(item, filePath))) {
                acc.push(file);
            }
            return acc;
        }, []);
        return res.json({ files, folders });
    }

    // // // check if accounts exist
    // // const hideList =
    // //     res.locals?.account?.hide.map((item: string) =>
    // //         path.join(uploadFolder, path.normalize(item))
    // //     ) ?? [];

    // // console.log("hideList:::", hideList);

    // const files = await getFiles(pathname);
    // const folders = await getFolders(pathname);
    // // console.log("folders:::", folders);

    // // // if pathname matches any of the hideList, return 403
    // // const isHidden = hideList.some((item: string) => isSubDirectory(item, pathname));
    // // if (isHidden) return res.status(403).json({ error: "Not enough permissions" });
    // // // filter out hidden folders
    // // const filteredFolders = folders?.filter((folder: Dirent) => {
    // //     const folderPath = path.join(pathname, folder.name);
    // //     return !hideList.some((item: string) => isSubDirectory(item, folderPath));
    // // });

    // res.json({ files, folders });
});

export { router };
