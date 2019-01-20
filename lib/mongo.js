"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const conf_1 = require("./conf");
class Mongo {
    static async connect() {
        const MongoClient = mongodb.MongoClient;
        const conf = conf_1.Conf.get();
        const url = conf.mongoUrl;
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
        });
        this.db = client.db(conf.mongoDb);
    }
    static getCollection(name) {
        if (this.db == null) {
            throw new Error("Please call Mongo.connect() first");
        }
        return this.db.collection(name);
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=mongo.js.map