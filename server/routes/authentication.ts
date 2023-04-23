import express from "express";
import _settings from "@functions/settings";

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
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const accounts: Accounts = (await settings).accounts;
        const account = accounts[username];

        // check if account exists
        if (!account) {
            return res.status(401).send("Account does not exist");
        }
        // check if password is correct
        if (account.password !== password) {
            return res.status(401).send("Incorrect password");
        }
        // the password is correct
        const secretKey = (await settings).secretkey;
        const accessToken = jwt.sign(username, secretKey);
        return res.status(200).send({ accessToken });
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});

export { router as authenticationRouter };
