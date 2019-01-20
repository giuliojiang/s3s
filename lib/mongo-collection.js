"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const COLLECTION_COLLECTION = "collection";
class MongoCollection {
    static async createCollection(data) {
        let collection = mongo_1.Mongo.getCollection(COLLECTION_COLLECTION);
        let result = await collection.insertOne({
            created: data.created.getTime(),
            name: data.name,
        });
        return result.insertedId.toString();
    }
    static async getCollections() {
        let collection = mongo_1.Mongo.getCollection(COLLECTION_COLLECTION);
        let docs = await collection.find().sort({
            created: -1,
        }).toArray();
        let results = [];
        for (let doc of docs) {
            let result = {
                created: new Date(doc.created),
                id: doc._id.toString(),
                name: doc.name,
            };
            results.push(result);
        }
        return results;
    }
}
exports.MongoCollection = MongoCollection;
//# sourceMappingURL=mongo-collection.js.map