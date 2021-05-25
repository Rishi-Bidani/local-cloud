// Copyright 2020-2021 Rishi Bidani
const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const uploadsFolder = path.join(__dirname, "../uploads");

// MiddleWare
app.use(express.json());
app.use(cors());

// Create an Uploads FOlder if it doesn't exist
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
} else {
}

// Any posts requests will be handled by the following file
const posts = require("./routes/posts");
app.use("/posts", posts);

app.use(express.static(path.join(__dirname, "public")));

app.get("/.*/", (req, res) => {
  // res.send("Hello World");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use default port during production, else 5000
// Running on 0.0.0.0 instead of localhost so that its accessible to other devices
// Example address 196.168.1.7:5000
const port = process.env.PORT || 5000;
http.listen(port, "0.0.0.0", () => {
  console.log(`listening on port ${port}`);
});
