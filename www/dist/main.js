/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/elements/root.js
var root = __webpack_require__(0);

// EXTERNAL MODULE: ./src/elements/router.js
var router = __webpack_require__(1);

// CONCATENATED MODULE: ./src/util/token.js
var s3sToken = {};

// Resolves only when token is set
s3sToken.tokenPromise = new Promise((resolve, reject) => {
    if (sessionStorage.token != null) {
        resolve();
    } else {
        s3sToken.onTokenSet = () => {
            resolve();
        }        
    }
});

s3sToken.setToken = (token) => {
    if (sessionStorage.token == null) {
        // Setting the new token
        sessionStorage.token = token;
        s3sToken.onTokenSet();
    } else {
        // Replacing an existing token
        sessionStorage.token = token;
        window.location.reload();
    }
};


// CONCATENATED MODULE: ./src/elements/home.js


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
// EXTERNAL MODULE: ./src/elements/navbar.js
var navbar = __webpack_require__(2);

// CONCATENATED MODULE: ./src/index.js





/***/ })
/******/ ]);