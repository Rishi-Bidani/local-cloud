// Copyright 2020-2021 Rishi Bidani
const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const uploadsFolder = path.join(__dirname, "../../uploads");
const multer = require("multer");
const zipper = require("zip-local");

// Setup storage for multer middleware
var storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// Function for finding folders and files in the directory
async function FilesAndFoldersArgs(getpath) {
  const promiseFolders = [];
  const promiseFiles = [];
  let files = await fs.promises.readdir(path.join(uploadsFolder, `${getpath}`), {
    withFileTypes: true,
  });
  for (let file of files) {
    if (file.isFile()) {
      promiseFiles.push({
        fileName: file.name,
        fileExtension: path.extname(file.name),
        fileSize: Number.parseFloat(
          fs.statSync(path.join(uploadsFolder, getpath, file.name)).size / 1024
        ).toFixed(3),
      });
    } else if (file.isDirectory()) {
      promiseFolders.push(file.name);
    }
  }
  return {
    sendFiles: promiseFiles,
    sendFolders: promiseFolders,
  };
}

// Create a new Folder
router.post("/newFolder", (req, res) => {
  let receivedPath = req.body.path;
  let receivedFolderName = req.body.folderName.trim();
  console.log("receivedPath: ", receivedPath, "\n", "recievedFolderName: ", receivedFolderName);
  let fullPath = path.join(uploadsFolder, `${receivedPath}/${receivedFolderName}`);
  fs.mkdir(fullPath, (err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  res.redirect("/");
});

// Get Directories
router.post("/dir", async (req, res) => {
  const dir = req.body.dir;
  // console.log(await FilesAndFoldersArgs(dir));
  res.json(await FilesAndFoldersArgs(dir));
});

// Handles requests for downloading files
router.get("/downloadFile/:file(*)", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.params.file);
  console.log(fullPath);
  res.sendFile(fullPath, (err) => console.log);
});

// Download folder
router.post("/downloadFolder", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.body.fullPath);
  const saveLocation = path.join(fullPath, `${req.body.folderName}.zip`);
  zipper.sync.zip(fullPath).compress().save(saveLocation);
  const zippedFolder = path.join(fullPath, `${req.body.folderName}.zip`);
  res.sendFile(zippedFolder, (err) => console.log(err));
});

// Upload File
router.post("/upload", upload.any(), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  for (let i = 0; i < req.files.length; i++) {
    let oldPath = path.join(uploadsFolder, req.files[i].originalname);
    let newPath = path.join(uploadsFolder, req.body.path, req.files[i].originalname);

    fs.rename(oldPath, newPath, (err) => {
      if (err) console.log(err);
    });
  }
  res.end("Files Reached");
});

// Delete a file
router.post("/deleteFile", (req, res) => {
  let fullPath = path.join(uploadsFolder, req.body.fullPath);
  fs.unlinkSync(fullPath);
  res.end("Deleted Successfully");
});

// Delete folder
router.post("/deleteFolder", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.body.fullPath);
  fs.rmdirSync(fullPath, { recursive: true });
  res.end;
});

module.exports = router;
