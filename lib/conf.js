"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conf {
    static set(conf) {
        this.conf = conf;
    }
    static get() {
        if (this.conf == null) {
            throw new Error("conf is still null");
        }
        return this.conf;
    }
}
Conf.conf = null;
exports.Conf = Conf;
//# sourceMappingURL=conf.js.map