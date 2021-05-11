const express = require("express");
const app = express();
const http = require("http").Server(app);
const router = express.Router();
const path = require("path");
const fs = require("fs");

const bodyParser = require("body-parser");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: path.join(__dirname, "/uploads"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// const upload = multer({ dest: path.join(__dirname, "/uploads") });

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

// app.use(multer({ dest: path.join(__dirname, "/uploads") }));

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

app.get("/:dir?", (req, res) => {
  let dir = req.params.dir;
  console.log(dir);
  fillFilesAndFolders().then((data) => {
    console.log(data);
    res.render("index", data);
  });
});

app.post("/navigateDirectories", (req, res) => {
  let getPath = req.body.thispath;
  console.log(getPath);
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

app.post("/file-upload", upload.any(), (req, res) => {
  console.log(req.body.path);
  console.log(req.files);

  for (let i = 0; i < req.files.length; i++) {
    let oldPath = path.join(__dirname, "uploads", req.files[i].originalname);
    let newPath = path.join(__dirname, "uploads", req.body.path, req.files[i].originalname);

    fs.rename(oldPath, newPath, (err) => {
      if (err) console.log(err);
    });
  }

  res.end("Files Uploaded");

  // fs.readFile(req.files.displayImage.path, function (err, data) {
  //   var newPath = __dirname + "/uploads";
  //   fs.writeFile(newPath, data, function (err) {
  //     res.redirect("back");
  //   });
  // });
});

// Use default port during production, else 5000
// Running on 0.0.0.0 instead of localhost so that its accessible to other devices
// Example address 196.168.1.7:5000
http.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log("listening on port");
});
