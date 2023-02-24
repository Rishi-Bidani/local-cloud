import express from "express";
// import * as path from "path";
import cors from "cors";
// import * as localIpV4Address from "local-ipv4-address";
import * as fs from "fs/promises";

// create require
const { Server } = require("http");
const app: express.Application = express();
const http = Server(app);

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
// listen to port at 0.0.0.0
http.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
});
