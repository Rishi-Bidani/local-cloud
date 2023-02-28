import express from "express";
// import * as path from "path";
import cors from "cors";
// import * as localIpV4Address from "local-ipv4-address";

import auth from "./middleware/authenticator";

// importing middlewares
import { authenticationRouter } from "./routes/authentication";

// create require
const { Server } = require("http");
const app: express.Application = express();
const http = Server(app);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authenticationRouter);

// routes
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
