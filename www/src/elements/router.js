window.customElements.define("s3s-router", class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Detect initial route
        let route = "s3s-home";
        let routePath = [];
        let path = location.pathname;
        if (path == "/") {
            // do nothing
        } else {
            let splt = path.split("/");
            route = splt[0];
            let remaining = [];
            for (let i = 1; i < splt.length; i++) {
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
