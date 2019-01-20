"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = __importStar(require("path"));
const conf_1 = require("./conf");
const mongo_1 = require("./mongo");
const route_redirector_1 = require("./route-redirector");
const route_upload_1 = require("./route-upload");
const s3 = __importStar(require("./s3"));
const createApp = async (config) => {
    conf_1.Conf.set(config);
    await mongo_1.Mongo.connect();
    await route_upload_1.RouteUpload.createUploadDir();
    await s3.initBucket();
    const app = express();
    app.get("/", (req, res) => {
        res.redirect("/s3s-home");
    });
    app.use(route_redirector_1.redirectorHandler());
    app.use("/", express.static(path.resolve(__dirname, "..", "www")));
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=index.js.map