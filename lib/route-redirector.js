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
const redirectorHandler = () => {
    const knownRoutes = new Set();
    knownRoutes.add("s3s-home");
    knownRoutes.add("s3s-upload");
    const app = express();
    app.get("/*", async (req, res, next) => {
        const fullRoute = req.params[0];
        const fullRouteSplit = fullRoute.split("/");
        const controllerName = fullRouteSplit[0];
        if (knownRoutes.has(controllerName)) {
            res.sendFile(path.resolve(__dirname, "..", "www", "index.html"));
        }
        else {
            next();
        }
    });
    return app;
};
exports.redirectorHandler = redirectorHandler;
//# sourceMappingURL=route-redirector.js.map