"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authentication_1 = require("./authentication");
const logger_1 = require("./logger");
const logger = logger_1.getLogger("middleware-header-auth");
// Use in-header authentication token.
class HeaderAuthMiddleware {
    static requireAuthentication() {
        const app = express();
        app.all("*", async (req, res, next) => {
            try {
                const token = req.get("S3S-Auth-Token");
                const authenticated = authentication_1.Authentication.authenticate(token);
                if (!authenticated) {
                    res.sendStatus(403);
                    return;
                }
                next();
            }
            catch (err) {
                logger.error("Error", err);
                res.sendStatus(403);
                return;
            }
        });
        return app;
    }
}
exports.HeaderAuthMiddleware = HeaderAuthMiddleware;
//# sourceMappingURL=middleware-auth-token.js.map