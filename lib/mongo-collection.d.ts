export interface CollectionModel {
    id?: string;
    name: string;
    created: Date;
}
export declare class MongoCollection {
    static createCollection(data: CollectionModel): Promise<string>;
    static getCollections(): Promise<CollectionModel[]>;
}
//# sourceMappingURL=mongo-collection.d.ts.map