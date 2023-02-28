import express from "express";
import * as jwt from "jsonwebtoken";

import _settings from "../functions/settings";
const settings = _settings();

async function jwtauthenticator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    // check if the settings include accounts
    if (!(await settings).accounts) {
        // if there are no accounts, continue
        next();
    } else {
        // if there are accounts, check for authorisation
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        // if there is no token, return 401
        if (token == null) return res.sendStatus(401);

        // verify the token
        const secretKey = (await settings).secretkey;
        jwt.verify(token, secretKey, (err: any, user: any) => {
            // if there is an error, return 403
            if (err) return res.sendStatus(403);
            // if the token is verified, continue
            (req as any).user = user;
            next();
        });
    }
}

export default jwtauthenticator;
