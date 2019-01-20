import * as AWS from "aws-sdk";
import * as fs from "fs";
import { Readable } from "stream";
import { Conf } from "./conf";
import * as loggerFactory from "./logger";
import * as util from "./util";

const logger = loggerFactory.getLogger("s3");

let priv: {
    s3: AWS.S3
} = {
    s3: null
};

let initBucket = async (): Promise<void> => {

    try {
        // Load the SDK for JavaScript
        // Set the region
        AWS.config.update({region: "eu-west-2"});

        // Create S3 service object
        priv.s3 = new AWS.S3({apiVersion: "2006-03-01"});

        // Call S3 to list current buckets
        let buckets = await new Promise<any[]>((resolve, reject) => {
            priv.s3.listBuckets((err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                logger.info("Bucket List: " + JSON.stringify(data.Buckets));
                resolve(data.Buckets);
                }
            });
        });

        let bucketAlreadyExists = () => {
            let targetBucket = Conf.get().bucket;
            for (let bucket of buckets) {
                if (bucket.Name === targetBucket) {
                    return true;
                }
            }
            return false;
        };

        if (!bucketAlreadyExists()) {
            // Create bucket
            await new Promise<void>((resolve, reject) => {
                priv.s3.createBucket({
                    Bucket: Conf.get().bucket
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    } catch (err) {
        logger.error("Error when initializing S3. Did you correctly set ~/.aws/credentials ?", err);
        process.exit(1);
    }
};

// filepath: string, location of the file on the local disk
// fileid: string, name of the file once uploaded on s3
// Return a Promise<uploadData>
let uploadFile = (filepath: string, fileid: string): Promise<AWS.S3.ManagedUpload.SendData> => {
    let uploadParams = {
        Body: "",
        Bucket: Conf.get().bucket,
        Key: "",
    };

    let filestream = fs.createReadStream(filepath);
    filestream.on("error", (err) => {
        console.info("File error", err);
    });
    uploadParams.Body = filestream as any;
    uploadParams.Key = fileid;

    let uploadPromise = new Promise<AWS.S3.ManagedUpload.SendData>((resolve, reject) => {
        priv.s3.upload(uploadParams, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    return uploadPromise;
};

let openFileAsStream = (fileid: string): Readable => {
    if (!util.isString(fileid)) {
        throw new Error("Not a string");
    }

    let params = {
        Bucket: Conf.get().bucket,
        Key: fileid
    };
    let result = priv.s3.getObject(params).createReadStream();
    return result;
};

export {
    uploadFile,
    openFileAsStream,
    initBucket
};
