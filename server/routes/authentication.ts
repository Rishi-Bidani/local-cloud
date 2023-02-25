import express from "express";
import _settings from "../functions/settings";

const settings = _settings();

const router = express.Router();

interface Account {
    password: string;
    hide: string[];
}

interface Accounts {
    [username: string]: Account;
}

router.post("/login", async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const accounts = (await settings).accounts;
});
