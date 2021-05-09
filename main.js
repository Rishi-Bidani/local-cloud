const express = require("express");
const app = express();
const http = require("http").Server(app);
const router = express.Router();
const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

app.use(express.static(path.join(__dirname + "/static")));
app.use(express.static(path.join(__dirname + "/uploads")));
app.use(express.static(path.join(__dirname + "/frontEndjs")));
app.set("views", path.join(__dirname, "/templates"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// for parsing application/json
app.use(express.json());
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded

// app.get("/", (req, res) => {
//   res.redirect("/cloud");
// });

// app.get("/cloud/:dir", (req, res) => {
//   let path = req.params.dir;
//   fs.readdir(`${path}`, (err, files) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("index", { files: files });
//     }
//   });
// });

// class handleFiles {
//   constructor() {
//     this.promiseFiles = [];
//     this.promiseFolders = [];
//   }
//   async fillFilesAndFolders() {
//     let files = await fs.promises.readdir("uploads", { withFileTypes: true });
//     for (let file of files) {
//       if (file.isFile()) {
//         this.promiseFiles.push(file.name);
//       } else if (file.isDirectory()) {
//         this.promiseFolders.push(file.name);
//       }
//     }
//     return {
//       sendFiles: this.promiseFiles,
//       sendFolders: this.promiseFolders,
//     };
//   }
// }

async function fillFilesAndFolders() {
  const promiseFolders = [],
    promiseFiles = [];
  let files = await fs.promises.readdir("uploads", { withFileTypes: true });
  for (let file of files) {
    if (file.isFile()) {
      promiseFiles.push(file.name);
    } else if (file.isDirectory()) {
      promiseFolders.push(file.name);
    }
  }
  return {
    sendFiles: promiseFiles,
    sendFolders: promiseFolders,
  };
}

async function FilesAndFoldersArgs(getpath) {
  const promiseFolders = [],
    promiseFiles = [];
  let files = await fs.promises.readdir(path.join("uploads", `${getpath}`), {
    withFileTypes: true,
  });
  for (let file of files) {
    if (file.isFile()) {
      promiseFiles.push(file.name);
    } else if (file.isDirectory()) {
      promiseFolders.push(file.name);
    }
  }
  return {
    sendFiles: promiseFiles,
    sendFolders: promiseFolders,
  };
}

// async function executefnf() {
//   fs.readdir("uploads", (err, files) => {
//     files.forEach((file) => {
//       if (fs.statSync(path.resolve(`uploads/${file}`)).isFile()) {
//         promiseFiles.push(file);
//       } else if (fs.statSync(path.resolve(`uploads/${file}`)).isDirectory()) {
//         promiseFolders.push(file);
//       } else {
//       }
//     });
//   });
//   return {
//     sendFiles: await Promise.all(promiseFiles),
//     sendFolders: await Promise.all(promiseFolders),
//   };
// }

app.get("/:dir?", (req, res) => {
  let dir = req.params.dir;
  console.log(dir);
  // let fileHandler = new handleFiles();

  // executefnf().then((data) => {
  //   if (data.sendFiles.length > 1 && data.sendFolders.length > 1) {
  //     data.sendFiles = [...new Set(data.sendFiles)];
  //     data.sendFolders = [...new Set(data.sendFolders)];
  //   }
  //   console.log(data);
  //   res.render("index", data);
  // });
  // fileHandler.fillFilesAndFolders().then((data) => {
  //   console.log(data);
  //   res.render("index", data);
  // });
  fillFilesAndFolders().then((data) => {
    console.log(data);
    res.render("index", data);
  });
});

app.post("/navigateDirectories", (req, res) => {
  let getPath = req.body.thispath;
  console.log(getPath);
  // res.redirect(`/cloud/uploads/${getPath}`);
  FilesAndFoldersArgs(getPath).then((response) => {
    console.log(response);
    res.json(response);
  });
});

// define a route to download a file
app.get("/download/:file(*)", (req, res) => {
  var file = req.params.file;
  var fileLocation = path.join("./uploads", file);
  console.log(fileLocation);
  res.download(fileLocation, file);
});

app.post("/newFolder", (req, res) => {
  let sentFolderPath = req.body.thispath;
  let folderName = req.body.FolderName.trim();
  folderPath = path.join(`./uploads/${sentFolderPath}`, folderName);
  fs.mkdir(folderPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

// Use default port during production, else 5000
// Running on 0.0.0.0 instead of localhost so that its accessible to other devices
// Example address 196.168.1.7:5000
http.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log("listening on port");
});
