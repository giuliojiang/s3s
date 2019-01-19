import express = require("express");

export class VHome {
    public static createApp(): express.Express {
        const app = express();

        return app;
    }
}
