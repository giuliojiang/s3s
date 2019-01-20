let isString = (s: any): boolean => {
    return typeof s === "string" || s instanceof String;
};

let stringNullOrEmpty = (s: any): boolean => {
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

let sleep = (duration: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};

let isNumber = (n: any): boolean => {
    return (typeof n === "number") || n instanceof Number;
};

export {
    isString,
    stringNullOrEmpty,
    sleep,
    isNumber
};
