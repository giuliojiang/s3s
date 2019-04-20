import { html, render } from 'lit-html';

window.customElements.define("s3s-router", class extends HTMLElement {
    constructor() {
        super();
        this.routePath = null;
    }

    connectedCallback() {
        let locationHash = window.S3S.locationHash;
        locationHash.addListener(routePath => {
            this.handlePathChange(routePath);
        });
        let initialPath = locationHash.getCurrentPath();
        this.handlePathChange(initialPath);
    }

    handlePathChange(routePath) {
        this.routePath = routePath;
        this.doRender();
    }

    doRender() {
        let generateRouteTag = () => {
            if (this.routePath == null) {
                return '';
            } else if (this.routePath.path == 'home') {
                return html`
                    <s3s-home></s3s-home>
                `;
            } else if (this.routePath.path == 'upload') {
                return html`
                    <s3s-upload></s3s-upload>
                `;
            } else {
                console.warn(`Unrecognized route route path named ${this.routePath.path}`);
                return '';
            }
        };

        render(html`
            ${generateRouteTag()}
        `, this);
    }
});
