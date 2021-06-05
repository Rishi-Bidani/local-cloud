// Copyright 2020-2021 Rishi Bidani
const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const os = require("os");
const multer = require("multer");
const zipper = require("zip-local");
const chalk = require("chalk");
// const uploadsFolder = path.join(__dirname, "../../uploads");
const uploadsFolder = path.join(os.homedir(), "HomeCloud");
const homeDir = path.join(os.homedir());

// Setup storage for multer middleware
const storage = multer.diskStorage({
  // destination: path.join(__dirname, "../../uploads"),
  // destination: path.join(uploadsFolder),
  destination: homeDir,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Colours for console
const green = chalk.green;
const red = chalk.red;
const blue = chalk.blue;

// Function for finding folders and files in the directory
async function FilesAndFoldersArgs(getpath) {
  const promiseFolders = [];
  const promiseFiles = [];
  let files = await fs.promises.readdir(getpath, {
    withFileTypes: true,
  });
  for (let file of files) {
    if (file.isFile()) {
      promiseFiles.push({
        fileName: file.name,
        fileExtension: path.extname(file.name),
        fileSize: Number.parseFloat(fs.statSync(path.join(getpath, file.name)).size / 1024).toFixed(
          3
        ),
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

// Function to check if someone is trying to navigate outside HomeCloud(uploads folder)
function checkPath(relPath) {
  const absPath = path.join(uploadsFolder, relPath);
  if (absPath.includes(uploadsFolder)) {
    return true;
  } else {
    return false;
  }
}

// Create a new Folder
router.post("/newFolder", (req, res) => {
  const receivedPath = req.body.path;
  const receivedFolderName = req.body.folderName.trim();
  // console.log("receivedPath: ", receivedPath, "\n", "recievedFolderName: ", receivedFolderName);
  const fullPath = path.join(uploadsFolder, `${receivedPath}/${receivedFolderName}`);
  fs.mkdir(fullPath, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(green(`Folder Created: ${fullPath}\n\n`));
    }
  });
  res.redirect("/");
});

// Get Directories _checkPath
router.post("/dir", async (req, res) => {
  const dir = req.body.dir;
  const absDirPath = path.join(uploadsFolder, dir);
  console.log(green("Accessing Folder: " + absDirPath + "\n\n"));

  // Performing a check to see if the user is requesting files outside of
  // HomeCloud(uploads) direcotry
  if (!checkPath(dir)) {
    // Deny Access to any documents outside HomeCloud
    console.log(red.bold(`Access Denied to: ${dir}`));
    res.status(403).send("You tried to access restricted files");
  } else {
    // console.log(await FilesAndFoldersArgs(dir));
    res.json(await FilesAndFoldersArgs(absDirPath));
  }
});

// Handles requests for downloading files _checkPath
router.get("/downloadFile/:file(*)", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.params.file);
  if (!checkPath(req.params.file)) {
    // Deny Access to any documents outside HomeCloud
    console.log(red.bold(`Access Denied to: ${dir}`));
    res.status(403).send("You tried to access restricted files");
  } else {
    // Download File if it is inside HomeCloud
    console.log(blue(`Request download For: ${req.params.file}` + `\nSending: ${fullPath}\n\n`));
    res.sendFile(fullPath, (err) => {
      if (err) console.log(red(err));
    });
  }
});

// Download folder _checkPath
router.post("/downloadFolder", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.body.fullPath);

  if (!checkPath(req.body.fullPath)) {
    // Deny Access to any documents outside HomeCloud
    console.log(red.bold(`Access Denied to: ${dir}`));
    res.status(403).send("You tried to access restricted files");
  } else {
    const saveLocation = path.join(fullPath, `${req.body.folderName}.zip`);
    // Delete zipped file if it exists
    if (fs.existsSync(saveLocation)) {
      fs.unlinkSync(saveLocation);
    } else {
    }
    zipper.sync.zip(fullPath).compress().save(saveLocation);
    console.log(
      blue(
        `Requested download of folder: ${req.body.folderName}` +
          `\nFolder zipped and sending: ${saveLocation}\n\n`
      )
    );
    res.sendFile(saveLocation, (err) => {
      if (err) console.log(red(err));
    });
  }
});

// Upload File
// Todo - Fix bug where, if u upload a file that exists in root, into some subfolder, the root file gets deleted
router.post("/upload", upload.any(), (req, res) => {
  // console.log(req.files);
  // console.log(req.body);
  for (let i = 0; i < req.files.length; i++) {
    let oldPath = path.join(homeDir, req.files[i].originalname);
    let newPath = path.join(uploadsFolder, req.body.path, req.files[i].originalname);

    fs.rename(oldPath, newPath, (err) => {
      if (err) console.log(err);
    });
    console.log(green(`Uploading File...\nUploaded: ${newPath}\n\n`));
  }
  res.end("Files Reached");
});

// Delete a file _checkPath
router.post("/deleteFile", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.body.fullPath);
  if (!checkPath(fullPath)) {
    res.status(403).send("You tried to delete restricted files");
  } else {
    fs.unlinkSync(fullPath);
    console.log(red(`Request To Delete: ${fullPath}\n\n`));
    res.end("Deleted Successfully");
  }
});

// Delete folder _checkPath
router.post("/deleteFolder", (req, res) => {
  const fullPath = path.join(uploadsFolder, req.body.fullPath);
  if (!checkPath(fullPath)) {
    res.status(403).send("You tried to delete restricted files");
  } else {
    if (fs.existsSync(fullPath)) {
      fs.rmdirSync(fullPath, { recursive: true });
      console.log(
        red(
          `Request to Delete Entire Folder: ${fullPath}` +
            `\nContents Of the Folder have been Lost\n\n`
        )
      );
    } else {
      console.log(`Request to Delete Entire Folder: ${fullPath}\nNo such folder exists!\n\n`);
    }
    res.end();
  }
});

module.exports = router;
