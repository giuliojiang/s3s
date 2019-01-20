import express = require("express");
import * as path from "path";

const redirectorHandler = (): express.Express => {
    const knownRoutes: Set<string> = new Set<string>();
    knownRoutes.add("s3s-home");
    knownRoutes.add("s3s-upload");

    const app = express();

    app.get("/*", async (req, res, next) => {
        const fullRoute = req.params[0];
        const fullRouteSplit = fullRoute.split("/");
        const controllerName = fullRouteSplit[0];
        if (knownRoutes.has(controllerName)) {
            res.sendFile(path.resolve(__dirname, "..", "www", "index.html"));
        } else {
            next();
        }
    });

    return app;
};

export {
    redirectorHandler,
};
