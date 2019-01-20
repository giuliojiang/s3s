import bodyParser = require("body-parser");
import express = require("express");
import { HeaderAuthMiddleware } from "./middleware-auth-token";
import { MongoCollection } from "./mongo-collection";

export class RouteNewCollection {

    public static createApp(): express.Express {

        let app = express();

        app.use(HeaderAuthMiddleware.requireAuthentication());

        app.use(bodyParser.json({
            limit: "200kb"
        }));

        app.post("/", async (req, res) => {

            try {

                let body = req.body;
                let newCollectionName: string = body.name;
                await MongoCollection.createCollection({
                    created: new Date(),
                    name: newCollectionName
                });

                res.sendStatus(200);

            } catch (err) {
                res.sendStatus(500);
            }

        });

        return app;

    }

}
