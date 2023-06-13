import express from "express";

const router = express.Router();

function checkPermissions(req: express.Request, res: express.Response, next: express.NextFunction) {
    const permissions = res.locals.permissions;
    const route = req.path;

    if (route.startsWith("/create") && !permissions.canCreateFolder) {
        return res.status(403).send("Not enough permissions");
    }

    if (route.startsWith("/upload") && !permissions.canUpload) {
        return res.status(403).send("Not enough permissions");
    }

    if (route.startsWith("/download") && !permissions.canDownload) {
        return res.status(403).send("Not enough permissions");
    }

    if (route.startsWith("/delete") && !permissions.canDeleteFile) {
        return res.status(403).send("Not enough permissions");
    }

    if (route.startsWith("/delete") && !permissions.canDeleteFolder) {
        return res.status(403).send("Not enough permissions");
    }

    next();
}

export { router };
