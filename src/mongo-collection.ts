import { Mongo } from "./mongo";

const COLLECTION_COLLECTION = "collection";

export interface CollectionModel {
    id?: string;
    name: string;
    created: Date;
}

export class MongoCollection {

    public static async createCollection(data: CollectionModel): Promise<string> {

        let collection = Mongo.getCollection(COLLECTION_COLLECTION);

        let result = await collection.insertOne({
            created: data.created.getTime(),
            name: data.name,
        });

        return result.insertedId.toString();
    }

    public static async getCollections(): Promise<CollectionModel[]> {

        let collection = Mongo.getCollection(COLLECTION_COLLECTION);

        let docs = await collection.find().sort({
            created: -1,
        }).toArray();

        let results: CollectionModel[] = [];
        for (let doc of docs) {
            let result: CollectionModel = {
                created: new Date(doc.created),
                id: doc._id.toString(),
                name: doc.name,
            };
            results.push(result);
        }

        return results;

    }

}
