class Logger {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public info(message: string) {
        console.info(`INFO [${this.name}]: ${message}`);
    }

    public error(message: string, err: Error) {
        console.info(`INFO [${this.name}]: ${message}`);
        if (err != null) {
            console.info(err);
        }
    }
}

const getLogger = (name: string): Logger => {
    return new Logger(name);
};

export {
    getLogger,
};
