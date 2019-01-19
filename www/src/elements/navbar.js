window.customElements.define("s3s-navbar", class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    align-items: center;
                }

                .title {
                    padding: 40px;
                    font-size: 75px;
                }
            </style>
        `;

        let navbar = document.createElement("div");
        navbar.classList.add("navbar");
        this.shadowRoot.appendChild(navbar);

        let title = document.createElement("div");
        title.classList.add("title");
        title.innerText = "s3s";
        navbar.appendChild(title);

        title.addEventListener("click", e => {
            e.stopPropagation();
            console.info("Got a click on the title");
        });
    }

});