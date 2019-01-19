"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(name) {
        this.name = name;
    }
    info(message) {
        console.info(`INFO [${this.name}]: ${message}`);
    }
    error(message, err) {
        console.info(`INFO [${this.name}]: ${message}`);
        if (err != null) {
            console.info(err);
        }
    }
}
const getLogger = (name) => {
    return new Logger(name);
};
exports.getLogger = getLogger;
//# sourceMappingURL=logger.js.map