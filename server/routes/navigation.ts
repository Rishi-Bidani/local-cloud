import express from "express";
const router = express.Router();

import { getFiles, getFolders } from "../functions/filesfolders";

router.get("files-and-folders/:pathname", async (req, res) => {
    const pathname = req.params.pathname;
});
