import mongodb = require("mongodb");
import { Mongo } from "./mongo";

const FILE_COLLECTION = "file";

export interface FileModel {
    id?: string;
    name: string;
    collectionid: string;
}

export class MongoFile {

    public static async addFile(data: FileModel): Promise<string> {

        let collection = Mongo.getCollection(FILE_COLLECTION);

        let mongoResult = await collection.insertOne({
            collectionid: data.collectionid,
            name: data.name,
        });

        return mongoResult.insertedId.toString();
    }

    public static async getFilesInCollection(collectionid: string): Promise<FileModel[]> {

        let collection = Mongo.getCollection(FILE_COLLECTION);

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
            };
        });

    }

    public static async getFileById(id: string): Promise<FileModel> {

        let collection = Mongo.getCollection(FILE_COLLECTION);

        let results = await collection.find({
            _id: new mongodb.ObjectId(id),
        }).toArray();

        if (results.length === 0) {
            throw new Error(`No file with _id ${id} was found`);
        } else {
            let doc = results[0];
            let result: FileModel = {
                collectionid: doc.collectionid,
                id: doc._id.toString(),
                name: doc.name,
            };
            return result;
        }

    }

}
