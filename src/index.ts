import express = require("express");
import * as path from "path";
import { redirectorHandler } from "./route-redirector";

const createApp = (): express.Express => {

    const app = express();

    app.get("/", (req, res) => {
        res.redirect("/s3s-home");
    });

    app.use(redirectorHandler());

    app.use("/", express.static(path.resolve(__dirname, "..", "www")));

    return app;

};

export {createApp};
