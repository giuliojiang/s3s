"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs"));
const conf_1 = require("./conf");
const loggerFactory = __importStar(require("./logger"));
const util = __importStar(require("./util"));
const logger = loggerFactory.getLogger("s3");
let priv = {
    s3: null
};
let initBucket = async () => {
    try {
        // Load the SDK for JavaScript
        // Set the region
        AWS.config.update({ region: "eu-west-2" });
        // Create S3 service object
        priv.s3 = new AWS.S3({ apiVersion: "2006-03-01" });
        // Call S3 to list current buckets
        let buckets = await new Promise((resolve, reject) => {
            priv.s3.listBuckets((err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    logger.info("Bucket List: " + JSON.stringify(data.Buckets));
                    resolve(data.Buckets);
                }
            });
        });
        let bucketAlreadyExists = () => {
            let targetBucket = conf_1.Conf.get().bucket;
            for (let bucket of buckets) {
                if (bucket.Name === targetBucket) {
                    return true;
                }
            }
            return false;
        };
        if (!bucketAlreadyExists()) {
            // Create bucket
            await new Promise((resolve, reject) => {
                priv.s3.createBucket({
                    Bucket: conf_1.Conf.get().bucket
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
    }
    catch (err) {
        logger.error("Error when initializing S3. Did you correctly set ~/.aws/credentials ?", err);
        process.exit(1);
    }
};
exports.initBucket = initBucket;
// filepath: string, location of the file on the local disk
// fileid: string, name of the file once uploaded on s3
// Return a Promise<uploadData>
let uploadFile = (filepath, fileid) => {
    let uploadParams = {
        Body: "",
        Bucket: conf_1.Conf.get().bucket,
        Key: "",
    };
    let filestream = fs.createReadStream(filepath);
    filestream.on("error", (err) => {
        console.info("File error", err);
    });
    uploadParams.Body = filestream;
    uploadParams.Key = fileid;
    let uploadPromise = new Promise((resolve, reject) => {
        priv.s3.upload(uploadParams, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
    return uploadPromise;
};
exports.uploadFile = uploadFile;
let openFileAsStream = (fileid) => {
    if (!util.isString(fileid)) {
        throw new Error("Not a string");
    }
    let params = {
        Bucket: conf_1.Conf.get().bucket,
        Key: fileid
    };
    let result = priv.s3.getObject(params).createReadStream();
    return result;
};
exports.openFileAsStream = openFileAsStream;
//# sourceMappingURL=s3.js.map