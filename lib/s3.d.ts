/// <reference types="node" />
import * as AWS from "aws-sdk";
import { Readable } from "stream";
declare let initBucket: () => Promise<void>;
declare let uploadFile: (filepath: string, fileid: string) => Promise<AWS.S3.ManagedUpload.SendData>;
declare let openFileAsStream: (fileid: string) => Readable;
export { uploadFile, openFileAsStream, initBucket };
//# sourceMappingURL=s3.d.ts.map