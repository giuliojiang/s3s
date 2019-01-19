declare class Logger {
    private name;
    constructor(name: string);
    info(message: string): void;
    error(message: string, err: Error): void;
}
declare const getLogger: (name: string) => Logger;
export { getLogger, };
//# sourceMappingURL=logger.d.ts.map