export interface IS3SConf {
    adminToken: string;
    bucket: string;
    uploadDir: string;
    mongoUrl: string;
    mongoDb: string;
}

export class Conf {

    public static set(conf: IS3SConf): void {
        this.conf = conf;
    }

    public static get(): IS3SConf {
        if (this.conf == null) {
            throw new Error("conf is still null");
        }
        return this.conf;
    }

    private static conf: IS3SConf = null;

}
