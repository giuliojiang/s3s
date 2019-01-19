window.customElements.define("s3s-home", class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div>s3s-home rendered</div>
        `;
    }

});