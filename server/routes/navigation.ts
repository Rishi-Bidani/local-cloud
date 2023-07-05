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

// async function filesBasedOnAccount(pathname: string, account: any, res: express.Response) {
//     const files = getFiles(pathname);
//     const folders = getFolders(pathname);

//     // get account hide and show items
//     const showItems =
//         account?.show.map((item: string) => {
//             return path.join(pathname, path.normalize(item));
//         }) ?? [];

//     // if show is provided, only show those items and return
//     if (showItems) {
//         // if we're in the root folder, show the showItems
//         if () {
//             // match each file and folder with showItems, if the names startswith any of the showItems, then show else hide
//             const filesToShow = (await files)?.filter((file: File) => {
//                 // return true if file.name starts with any of the showItems
//                 return showItems.some((item: string) => {
//                     return file.name.startsWith(item);
//                 });
//             });
//             const foldersToShow = (await folders)?.filter((folder: Dirent) => {
//                 const folderPath = path.join(pathname, folder.name);
//                 return showItems.some((item: string) => {
//                     return folderPath.startsWith(item);
//                 });
//             });
//             return res.json({ files: filesToShow, folders: foldersToShow });
//         }
//     }

//     // if hide is provided, hide those items and return
//     const hiddenItems =
//         account?.hide.map((item: string) => {
//             return path.join(pathname, path.normalize(item));
//         }) ?? [];

//     // if hide is provided, hide those items and return
//     if (hiddenItems) {
//         // match each file and folder with hiddenItems, if the names startswith any of the hiddenItems, then hide else show
//         const filesToShow = (await files)?.filter((file: File) => {
//             // return true if file.name starts with any of the showItems
//             return !hiddenItems.some((item: string) => {
//                 return file.name.startsWith(item);
//             });
//         });
//         const foldersToShow = (await folders)?.filter((folder: Dirent) => {
//             const folderPath = path.join(pathname, folder.name);
//             return !hiddenItems.some((item: string) => {
//                 return folderPath.startsWith(item);
//             });
//         });
//         return res.json({ files: filesToShow, folders: foldersToShow });
//     }

//     // if no show or hide is provided, return everything
//     const filesToShow = await files;
//     const foldersToShow = await folders;
//     return res.json({ files: filesToShow, folders: foldersToShow });
// }

router.get(":pathname(/*)?", authenticator, async (req, res) => {
    const accountName = res.locals?.accountName;
    const account = res.locals?.account;
    console.log(accountName);

    // if (!account.permissions.navigate) {
    //     return res.status(403).json({ error: "Not enough permissions" });
    // }

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

    if (accountName === "admin") {
        // admin can access everything
        const files = await getFiles(pathname);
        const folders = await getFolders(pathname);
        return res.json({ files, folders });
    }

    // ############## NOT ADMIN AT THIS POINT ##############

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
            console.log("in root folder");
            // if yes, show only folder with the show item name
            const foldersToShow = (await getFolders(pathname))?.filter((folder: Dirent) => {
                return show.some((item: string) => {
                    return folder.name.startsWith(item);
                });
            });
            // console.log(foldersToShow);
            // const foldersToShow = intersectionShowFolder(
            //     (await getFolders(pathname)) || [],
            //     show,
            //     "name",
            //     uploadFolder
            // );
            return res.json({ folders: foldersToShow, files: [] });
        } else {
            console.log("not in root folder");
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

    return;

    // return filesBasedOnAccount(pathname, account, res);
    // ====================================================================================================
    const hiddenItems =
        account?.hide?.map((item: string) => {
            return path.join(uploadFolder, path.normalize(item));
        }) ?? [];
    // const showItems =
    //     account?.show.map((item: string) => {
    //         return path.join(uploadFolder, path.normalize(item));
    //     }) ?? [];
    // TODO: only show showItems, if we're in the root folder... else show everything

    // check if the path is hidden
    // console.log(pathname, hiddenItems);
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
    // ====================================================================================================

    // ####################################################################################################
    // previously commented out
    // ####################################################################################################

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
