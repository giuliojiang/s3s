import { Conf } from "./conf";

export class Authentication {
    public static authenticate(pass: string): boolean {
        const config = Conf.get();
        return config.adminToken === pass;
    }
}
