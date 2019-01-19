window.customElements.define("s3s-root", class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <s3s-navbar></s3s-navbar>
            <s3s-router></s3s-router>
        `;
    }

});
