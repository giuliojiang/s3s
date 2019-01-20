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
                let collectionid = await MongoCollection.createCollection({
                    created: new Date(),
                    name: newCollectionName
                });

                res.send(JSON.stringify({
                    collectionid: collectionid
                }));

            } catch (err) {
                res.sendStatus(500);
            }

        });

        return app;

    }

}
