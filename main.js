const express = require("express");
const app = express();
const http = require("http").Server(app);
const router = express.Router();
const path = require("path");
const fs = require("fs");

app.use(express.static(path.join(__dirname + "/static")));
app.use(express.static(path.join(__dirname + "/uploads")));
app.set("views", path.join(__dirname, "/templates"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { files: files });
    }
  });
});

// define a route to download a file
app.get("/download/:file(*)", (req, res) => {
  var file = req.params.file;
  var fileLocation = path.join("./", file);
  console.log(fileLocation);
  res.download(fileLocation, file);
});

// Use default port during production, else 5000
// Running on 0.0.0.0 instead of localhost so that its accessible to other devices
// Example address 196.168.1.7:5000
http.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log("listening on port");
});
