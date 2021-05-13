const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const uploadsFolder = path.join(__dirname, "../../uploads");

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

// Upload File

//

module.exports = router;
