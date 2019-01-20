"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const mongo_1 = require("./mongo");
const FILE_COLLECTION = "file";
class MongoFile {
    static async addFile(data) {
        let collection = mongo_1.Mongo.getCollection(FILE_COLLECTION);
        let mongoResult = await collection.insertOne({
            collectionid: data.collectionid,
            name: data.name,
            s3id: data.s3id
        });
        return mongoResult.insertedId.toString();
    }
    static async getFilesInCollection(collectionid) {
        let collection = mongo_1.Mongo.getCollection(FILE_COLLECTION);
        let docs = await collection.find({
            collectionid: collectionid,
        }).sort({
            name: 1
        }).toArray();
        return docs.map((doc) => {
            return {
                collectionid: doc.collectionid,
                id: doc._id.toString(),
                name: doc.name,
                s3id: doc.s3id,
            };
        });
    }
    static async getFileById(id) {
        let collection = mongo_1.Mongo.getCollection(FILE_COLLECTION);
        let results = await collection.find({
            _id: new mongodb.ObjectId(id),
        }).toArray();
        if (results.length === 0) {
            throw new Error(`No file with _id ${id} was found`);
        }
        else {
            let doc = results[0];
            let result = {
                collectionid: doc.collectionid,
                id: doc._id.toString(),
                name: doc.name,
                s3id: doc.s3id
            };
            return result;
        }
    }
}
exports.MongoFile = MongoFile;
//# sourceMappingURL=mongo-file.js.map