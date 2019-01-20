"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoRandomString = require("crypto-random-string");
const express = require("express");
const fs = require("fs");
const path = require("path");
const conf_1 = require("./conf");
const logger_1 = require("./logger");
const middleware_auth_token_1 = require("./middleware-auth-token");
const mongo_file_1 = require("./mongo-file");
const s3 = __importStar(require("./s3"));
const logger = logger_1.getLogger("route-upload");
class RouteUpload {
    static createUploadDir() {
        let uploadDir = conf_1.Conf.get().uploadDir;
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        this.directoryCreated = true;
    }
    static createApp() {
        if (!this.directoryCreated) {
            throw new Error("Please call RouteUpload.createUploadDir() first");
        }
        let app = express();
        app.use(middleware_auth_token_1.HeaderAuthMiddleware.requireAuthentication());
        app.post("/", async (req, res) => {
            try {
                let collectionid = req.get("S3S-api-upload-collectionid");
                let filename = req.get("S3S-api-upload-filename");
                let randomName = cryptoRandomString(48);
                let uploadDir = conf_1.Conf.get().uploadDir;
                let uploadPath = path.resolve(uploadDir, randomName);
                logger.info(`Writing to temporary file ${uploadPath}`);
                let writeStream = fs.createWriteStream(uploadPath);
                req.pipe(writeStream);
                writeStream.on("finish", async () => {
                    try {
                        // Upload to S3
                        await s3.uploadFile(uploadPath, randomName);
                        // Delete temporary file on disk
                        await new Promise((resolve, reject) => {
                            fs.unlink(uploadPath, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve();
                                }
                            });
                        });
                        // Write file entry to db
                        await mongo_file_1.MongoFile.addFile({
                            collectionid: collectionid,
                            name: filename,
                            s3id: randomName
                        });
                        // Send response
                        res.sendStatus(200);
                    }
                    catch (err) {
                        logger.error("Error", err);
                        res.sendStatus(500);
                    }
                });
            }
            catch (err) {
                logger.error("Error", err);
                res.sendStatus(500);
            }
        });
        return app;
    }
}
RouteUpload.directoryCreated = false;
exports.RouteUpload = RouteUpload;
//# sourceMappingURL=route-upload.js.map