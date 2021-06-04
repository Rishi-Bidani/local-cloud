// Copyright 2020-2021 Rishi Bidani
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const localIpV4Address = require("local-ipv4-address");
const os = require("os");
const dirname = process.cwd();
const uploadsFolder = path.join(os.homedir(), "HomeCloud");
const chalk = require("chalk");
// const uploadsFolder = path.join(__dirname, "../uploads");

// MiddleWare
app.use(express.json());
app.use(cors());

// Create an Uploads Folder if it doesn't exist
if (!fs.existsSync(uploadsFolder)) {
  // fs.mkdirSync(uploadsFolder);
  fs.mkdirSync(path.join(os.homedir(), "HomeCloud"));
} else {
}

// Any posts requests will be handled by the following file
const posts = require("./routes/posts");
app.use("/posts", posts);

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(dirname, "server", "public")));

app.get("/.*/", (req, res) => {
  // res.send("Hello World");
  // res.sendFile(path.join(__dirname, "public", "index.html"));
  res.sendFile(path.join(dirname, "server", "public", "index.html"));
});

// Use default port during production, else 5000
// Running on 0.0.0.0 instead of localhost so that its accessible to other devices
// Example address 196.168.1.7:5000
const port = process.env.PORT || 5000;
http.listen(port, "0.0.0.0", () => {
  localIpV4Address().then(function (ipAddress) {
    const websiteLink = `http://${ipAddress}:${port}`;
    console.log(`Website live on: ${chalk.cyan(websiteLink)}`);
    // const start =
    //   process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open";
    // require("child_process").exec(start + " " + websiteLink);
  });
});
