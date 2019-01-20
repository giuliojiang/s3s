import express = require("express");
import { Authentication } from "./authentication";
import { getLogger } from "./logger";

const logger = getLogger("middleware-header-auth");

// Use in-header authentication token.

export class HeaderAuthMiddleware {

    public static requireAuthentication(): express.Express {

        const app = express();

        app.all("*", async (req, res, next) => {
            try {
                const token = req.get("S3S-Auth-Token");
                const authenticated: boolean = Authentication.authenticate(token);

                if (!authenticated) {
                    res.sendStatus(403);
                    return;
                }

                next();
            } catch (err) {
                logger.error("Error", err);
                res.sendStatus(403);
                return;
            }
        });

        return app;

    }
}
