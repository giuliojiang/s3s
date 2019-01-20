export interface IS3SConf {
    adminToken: string;
    bucket: string;
    uploadDir: string;
    mongoUrl: string;
    mongoDb: string;
}
export declare class Conf {
    static set(conf: IS3SConf): void;
    static get(): IS3SConf;
    private static conf;
}
//# sourceMappingURL=conf.d.ts.map