// Copyright Rishi Bidani
import express from "express";
const router = express.Router();

import path from "path";
import _settings from "@functions/settings";
const settings = _settings();

import Logging, { ApiType } from "@functions/logging";

// TODO: add authentication middleware

// download file - send file
router.get("/", async (req: express.Request, res: express.Response) => {
    const pathname = req.query.pathname as string;
    Logging.download(ApiType.GET, `downloaded file: ${pathname}`);
    const baseFolder = (await settings).uploadfolder;
    const fullPath = path.join(baseFolder, pathname);
    console.log("fullPath: ", fullPath);
    res.sendFile(fullPath);
});

// download file - direct download
router.get("/direct", async (req: express.Request, res: express.Response) => {
    const pathname = req.query.pathname as string;
    Logging.download(ApiType.GET, `downloaded file: ${pathname}`);
    const baseFolder = (await settings).uploadfolder;
    const fullPath = path.join(baseFolder, pathname);
    console.log("fullPath: ", fullPath);
    res.download(fullPath);
});

// download folder

export { router };
