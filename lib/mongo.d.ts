import mongodb = require("mongodb");
export declare class Mongo {
    static connect(): Promise<void>;
    static getCollection(name: string): mongodb.Collection<any>;
    private static db;
}
//# sourceMappingURL=mongo.d.ts.map