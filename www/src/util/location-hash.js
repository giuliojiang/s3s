export class RoutePath {
    constructor(path, parameters) { }
}

export class LocationHash {

    constructor() {
        this.path = new RoutePath('s3s-home', []); // Default path
        this.listeners = []; // list of functions
        window.onhashchange = () => {
            this.updateFromAddress();
        };
        this.updateFromAddress(); // Try to detect initial hash
    }

    getCurrentPath() {
        return this.path;
    }

    // Read from window.location
    updateFromAddress() {
        let p = window.location.hash;
        
        if (p == null || p == '') {
            return; // Do nothing with invalid path
        }

        if (p.startsWith('#')) {
            p = p.substring(1);
        }

        let splt = p.split('/');
        let routeName = splt[0];
        let parameters = splt.slice(1);
        this.path = new RoutePath(routeName, parameters);
        this.updateListeners();
    }

    updateListeners() {
        for (let listener of this.listeners) {
            listener(this.path);
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

}