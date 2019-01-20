"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let isString = (s) => {
    return typeof s === "string" || s instanceof String;
};
exports.isString = isString;
let stringNullOrEmpty = (s) => {
    if (s == null) {
        return true;
    }
    if (!isString(s)) {
        return true;
    }
    if (s === "") {
        return true;
    }
    return false;
};
exports.stringNullOrEmpty = stringNullOrEmpty;
let sleep = (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};
exports.sleep = sleep;
let isNumber = (n) => {
    return (typeof n === "number") || n instanceof Number;
};
exports.isNumber = isNumber;
//# sourceMappingURL=util.js.map