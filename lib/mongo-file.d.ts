export interface FileModel {
    id?: string;
    name: string;
    collectionid: string;
    s3id: string;
}
export declare class MongoFile {
    static addFile(data: FileModel): Promise<string>;
    static getFilesInCollection(collectionid: string): Promise<FileModel[]>;
    static getFileById(id: string): Promise<FileModel>;
}
//# sourceMappingURL=mongo-file.d.ts.map