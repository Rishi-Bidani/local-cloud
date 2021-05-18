const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const uploadsFolder = path.join(__dirname, "../../uploads");

// Function for finding folders and files in the directory
async function FilesAndFoldersArgs(getpath) {
  const promiseFolders = [];
  const promiseFiles = [];
  let files = await fs.promises.readdir(path.join(__dirname, "../../uploads", `${getpath}`), {
    withFileTypes: true,
  });
  for (let file of files) {
    if (file.isFile()) {
      promiseFiles.push({
        fileName: file.name,
        fileExtension: path.extname(file.name),
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
  let dir = req.body.dir;
  console.log(dir);
  console.log(await FilesAndFoldersArgs(dir));
  res.json(await FilesAndFoldersArgs(dir));
});

router.get("/downloadFile/:file(*)", (req, res) => {
  // let filePath = req.body.filePath;
  // let fileName = req.body.fileName;
  let fullPath = path.join(uploadsFolder, req.params.file);
  // console.log(filePath, "\n", fileName, "\n");
  console.log(fullPath);
  res.sendFile(fullPath, (err) => console.log);
});

// Upload File

//

module.exports = router;
