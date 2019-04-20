import express = require("express");
import * as path from "path";
import { Conf, S3SConf } from "./conf";
import { Mongo } from "./mongo";
import { RouteUpload } from "./route-upload";
import * as s3 from "./s3";

const createApp = async (config: S3SConf): Promise<express.Express> => {

    Conf.set(config);
    await Mongo.connect();
    await RouteUpload.createUploadDir();
    await s3.initBucket();

    const app = express();

    app.get("/", (req, res) => {
        res.redirect("/index.html");
    });

    app.use("/", express.static(path.resolve(__dirname, "..", "www")));

    return app;

};

export {createApp};
