import express from "express";
const router = express.Router();
import path from "path";
import { access } from "fs/promises";

import { getFiles, getFolders, removeItemsFromList } from "@functions/filesfolders";
import authenticator from "../middleware/authenticator";

import _settings from "@functions/settings";
import { Dirent } from "fs";
const settings = _settings();

import Logging, { ApiType } from "@functions/logging";

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
    const accountName = res.locals?.accountName;
    const account = res.locals?.account;
    console.log(accountName);

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

    // ############## CHECK IF ADMIN ##############
    if (accountName === "admin") {
        // admin can access everything
        const files = await getFiles(pathname);
        const folders = await getFolders(pathname);
        return res.json({ files, folders });
    }

    // ############## NOT ADMIN AT THIS POINT ##############
    // check is account has permission to navigate
    const navigate = account?.permissions.navigate ?? true;
    console.log(navigate);
    if (!navigate) {
        // if the user can't navigate, return empty
        // its not an error, just empty
        return res.json({ files: [], folders: [] });
    }

    // check if settings has show or hide
    const show = account?.show;
    const hide = account?.hide;

    // if show is provided
    //      check if in root folder
    //          if yes, show only folder with the show item name
    //          if no, check if path begins with uploadFolder + show item name
    //      if in show subfolder, show everything
    //      else show nothing
    if (show) {
        // check if in root folder
        if (path.relative(pathname, uploadFolder) === "") {
            // if yes, show only folder with the show item name
            const foldersToShow = (await getFolders(pathname))?.filter((folder: Dirent) => {
                return show.some((item: string) => {
                    return folder.name.startsWith(item);
                });
            });
            // const foldersToShow = intersectionShowFolder(
            //     (await getFolders(pathname)) || [],
            //     show,
            //     "name",
            //     uploadFolder
            // );
            return res.json({ folders: foldersToShow, files: [] });
        } else {
            // if no, check if path begins with uploadFolder + show item name
            const isInSubFolder = show.some((item: string) => {
                return pathname.startsWith(path.join(uploadFolder, item));
            });
            if (isInSubFolder) {
                // if in show subfolder, show everything
                const files = await getFiles(pathname);
                const folders = await getFolders(pathname);
                return res.json({ files, folders });
            } else {
                // else show nothing
                return res.json({ files: [], folders: [] });
            }
        }
    }

    // if hide is provided
    //      hide everything that matches the path of hide item name

    if (hide) {
        const files = await getFiles(pathname);
        const folders = await getFolders(pathname);

        const absoluteHide = hide.map((item: string) => {
            return path.resolve(path.join(uploadFolder, item));
        });

        const filteredFolders = await removeItemsFromList(
            folders || [],
            absoluteHide,
            "name",
            pathname
        );

        const filteredFiles = await removeItemsFromList(
            files || [],
            absoluteHide,
            "name",
            pathname
        );
        return res.json({ files: filteredFiles, folders: filteredFolders });
    }
});

function intersectionShowFolder<T>(
    folders: T[],
    searchList: string[],
    attr: string,
    uploadFolder: string
): T[] {
    const setA = new Set(folders);
    const setB = new Set(searchList.map((item: string) => path.resolve(uploadFolder, item)));
    console.log(setB);
    const intersection = new Set(
        [...setA].filter((_item: T) => {
            const item = path.resolve(path.join(uploadFolder, (_item as any)[attr]));
            return setB.has(item);
        })
    );
    return [...intersection];
}

export { router };
