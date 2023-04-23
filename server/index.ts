import express from "express";
import cors from "cors";
// import * as localIpV4Address from "local-ipv4-address";

import auth from "./middleware/authenticator";

import createStorageFolders from "@functions/createstoragefolders";

// setup the folders - data, temp
(async function () {
    await createStorageFolders();
})();

// create require
const { Server } = require("http");
const app: express.Application = express();
const http = Server(app);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes =============================================================
import { authenticationRouter } from "@routes/authentication";
app.use("/auth", authenticationRouter);

import { router as navigationRouter } from "@routes/navigation";
app.use("/navigate", navigationRouter);

import { router as uploadRouter } from "@routes/upload";
app.use("/upload", uploadRouter);

import { router as downloadRouter } from "@routes/download";
app.use("/download", downloadRouter);

import { router as CreateRouter } from "@routes/create";
app.use("/create", CreateRouter);

import { router as DeleteRouter } from "@routes/delete";
app.use("/delete", DeleteRouter);
// ====================================================================

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// route purely for testing authorisation
app.get("/testauth", auth, (req, res) => {
    console.log((req as any).user);
    res.send("Authorisation is working");
});

const PORT = process.env.PORT || 5000;
// listen to port at 0.0.0.0
http.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on port ${PORT}`);
});
