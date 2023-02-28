import express from "express";
import _settings from "../functions/settings";

const settings = _settings();
const router = express.Router();

import * as jwt from "jsonwebtoken";

interface Account {
    password: string;
    hide: string[];
}

interface Accounts {
    [username: string]: Account;
}

router.post("/login", async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const accounts: Accounts = (await settings).accounts;
    const account = accounts[username];
    // check if account exists
    if (!account) {
        res.status(401).send("Account does not exist");
    }
    // check if password is correct
    if (account.password !== password) {
        res.status(401).send("Incorrect password");
    }
    // the password is correct
    const secretKey = (await settings).secretkey;
    const accessToken = jwt.sign(username, secretKey);
    res.status(200).send({ accessToken });
});

export { router as authenticationRouter };
