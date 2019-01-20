import mongodb = require("mongodb");
import { Conf } from "./conf";

export class Mongo {
    public static async connect(): Promise<void> {
        const MongoClient = mongodb.MongoClient;
        const conf = Conf.get();
        const url = conf.mongoUrl;

        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
        });

        this.db = client.db(conf.mongoDb);
    }

    public static getCollection(name: string): mongodb.Collection<any> {
        if (this.db == null) {
            throw new Error("Please call Mongo.connect() first");
        }

        return this.db.collection(name);
    }

    private static db: mongodb.Db;
}
