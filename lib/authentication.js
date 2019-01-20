"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = require("./conf");
class Authentication {
    static authenticate(pass) {
        const config = conf_1.Conf.get();
        return config.adminToken === pass;
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=authentication.js.map