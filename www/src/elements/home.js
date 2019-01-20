import { s3sToken } from "../util/token";

window.customElements.define("s3s-home", class extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        this.innerHTML = /*html*/`
            <style>
                .s3s-home-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    width: 100%;
                    padding: 10px;
                }

                .s3s-home-input-div {
                    width: 50%;
                }

                .s3s-home-input {
                    border: 0;
                    margin: 0;
                    padding: 10px;
                    width: 100%;
                }
            </style>
        `;

        let container = document.createElement("div");
        this.appendChild(container);
        container.classList.add("s3s-home-container");

        let tokenDiv = document.createElement("div");
        tokenDiv.classList.add("s3s-home-input-div");
        container.appendChild(tokenDiv);

        let tokenInput = document.createElement("input");
        tokenInput.setAttribute("type", "text");
        tokenInput.setAttribute("placeholder", "magic token");
        tokenInput.classList.add("s3s-home-input");
        tokenDiv.appendChild(tokenInput);
        tokenInput.addEventListener("keyup", e => {
            e.stopPropagation();
            let code = e.keyCode;
            if (code == 13) {
                // ENTER
                let inputValue = tokenInput.value;
                console.info(`inputValue is ${inputValue}`);
                s3sToken.setToken(inputValue);
            }
        });

        await s3sToken.tokenPromise;

        console.info("tokenPromise resolved!");

        let collectionsDiv = document.createElement("div");
        collectionsDiv.innerText = "Collections!";
        container.appendChild(collectionsDiv);
    }

});