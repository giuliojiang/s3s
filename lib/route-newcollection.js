"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const middleware_auth_token_1 = require("./middleware-auth-token");
const mongo_collection_1 = require("./mongo-collection");
class RouteNewCollection {
    static createApp() {
        let app = express();
        app.use(middleware_auth_token_1.HeaderAuthMiddleware.requireAuthentication());
        app.use(bodyParser.json({
            limit: "200kb"
        }));
        app.post("/", async (req, res) => {
            try {
                let body = req.body;
                let newCollectionName = body.name;
                let collectionid = await mongo_collection_1.MongoCollection.createCollection({
                    created: new Date(),
                    name: newCollectionName
                });
                res.send(JSON.stringify({
                    collectionid: collectionid
                }));
            }
            catch (err) {
                res.sendStatus(500);
            }
        });
        return app;
    }
}
exports.RouteNewCollection = RouteNewCollection;
//# sourceMappingURL=route-newcollection.js.map