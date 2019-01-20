import express = require("express");
import { S3SConf } from "./conf";
declare const createApp: (config: S3SConf) => Promise<express.Express>;
export { createApp };
//# sourceMappingURL=index.d.ts.map