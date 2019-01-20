window.customElements.define("s3s-upload", class extends HTMLElement {

    constructor() {
        super();
        this.files = null;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`
            <style>
                .s3s-upload-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    padding: 10px;
                }
            </style>
        `;

        let container = document.createElement("div");
        container.classList.add("s3s-upload-container");
        this.appendChild(container);

        // Album name input
        let nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("placeholder", "Album name");
        container.appendChild(nameInput);

        // Choose files
        let filesSelect = document.createElement("input");
        filesSelect.setAttribute("type", "file");
        filesSelect.setAttribute("multiple", "");
        filesSelect.addEventListener("change", async () => {
            this.files = filesSelect.files;
        }, false);

        // Start upload button
        // TODO
    }

});