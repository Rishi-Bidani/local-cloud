// Copyright 2021-2022 Rishi Bidani
import express from "express";
import * as h from "http";
import * as path from "path";
import cors from "cors";
import * as localIpV4Address from "local-ipv4-address"
import * as fs from "fs"

const app = express();
const http = h.Server(app)

import { UPLOAD_FOLDER, HOME_DIR, cyan } from "./js/globalvariables.js";

const dirname = process.cwd();
// MiddleWare
app.use(express.json());
app.use(cors());

// Create an Uploads Folder if it doesn't exist
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(path.join(HOME_DIR, "HomeCloud"));
} else {
}

// Any posts requests will be handled by the following file
import * as posts from "./routes/posts.js"
import * as gets from "./routes/gets.js"
import * as deletes from "./routes/deletes.js"

app.use("/posts", posts.router);
app.use("/gets", gets.router);
app.use("/deletes", deletes.router);

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(dirname, "public")));

app.get("/.*/", (req, res) => {
    // res.send("Hello world!")
    res.sendFile(path.join(dirname, "public", "index.html"));
});
// Use default port during production, else 5000
// Running on 0.0.0.0 instead of localhost so that its accessible to other devices
// Example address 196.168.1.7:5000
const PORT = process.env.PORT || 5000;
http.listen(PORT, "0.0.0.0", async () => {
    const ipAddress = await localIpV4Address.default()
    const websiteLink = `http://${ipAddress}:${PORT}`;
    console.log(`Website live on: ${cyan(websiteLink)}`);
});

