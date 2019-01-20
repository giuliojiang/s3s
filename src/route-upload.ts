import cryptoRandomString = require("crypto-random-string");
import express = require("express");
import fs = require("fs");
import path = require("path");
import { Conf } from "./conf";
import { getLogger } from "./logger";
import { HeaderAuthMiddleware } from "./middleware-auth-token";
import { MongoFile } from "./mongo-file";
import * as s3 from "./s3";

const logger = getLogger("route-upload");

export class RouteUpload {

    public static createUploadDir(): void {

        let uploadDir = Conf.get().uploadDir;

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        this.directoryCreated = true;

    }

    public static createApp(): express.Express {

        if (!this.directoryCreated) {
            throw new Error("Please call RouteUpload.createUploadDir() first");
        }

        let app = express();

        app.use(HeaderAuthMiddleware.requireAuthentication());

        app.post("/", async (req, res) => {

            try {

                let collectionid = req.get("S3S-api-upload-collectionid");
                let filename = req.get("S3S-api-upload-filename");

                let randomName = cryptoRandomString(48);
                let uploadDir = Conf.get().uploadDir;
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
                                } else {
                                    resolve();
                                }
                            });
                        });

                        // Write file entry to db
                        await MongoFile.addFile({
                            collectionid: collectionid,
                            name: filename,
                            s3id: randomName
                        });

                        // Send response
                        res.sendStatus(200);

                    } catch (err) {
                        logger.error("Error", err);
                        res.sendStatus(500);
                    }
                });
            } catch (err) {
                logger.error("Error", err);
                res.sendStatus(500);
            }

        });

        return app;

    }

    private static directoryCreated: boolean = false;

}
