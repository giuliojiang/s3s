export interface S3SConf {
    adminToken: string;
    bucket: string;
    uploadDir: string;
    mongoUrl: string;
    mongoDb: string;
}
export declare class Conf {
    static set(conf: S3SConf): void;
    static get(): S3SConf;
    private static conf;
}
//# sourceMappingURL=conf.d.ts.map