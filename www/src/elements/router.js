window.customElements.define("s3s-router", class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Detect initial route
        let route = "s3s-home";
        let routePath = [];
        let path = location.pathname;
        console.info("location.pathname is " + path);
        if (path == "/") {
            // do nothing
        } else {
            let splt = path.split("/");
            console.info("splt is " + JSON.stringify(splt));
            route = splt[1];
            let remaining = [];
            for (let i = 2; i < splt.length; i++) {
                remaining.push(splt[i]);
            }
            routePath = remaining;
        }

        this.innerHTML = '';
        let elem = document.createElement(route);
        elem.routepath = routePath;
        this.appendChild(elem);
    }
});
