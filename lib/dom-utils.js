"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require("jsdom");
class Dom {
    constructor() {
        this.dom = new jsdom.JSDOM(`
            <!DOCTYPE html>
            <head>
            </head>
            <body></body>
        `);
    }
    addText(text) {
        this.addInDiv(this.dom, () => {
            const div = this.dom.window.document.createElement("div");
            div.innerHTML = this.escapeHtml(text);
            return div;
        });
    }
    addH1(text) {
        this.addInDiv(this.dom, () => {
            const h1 = this.dom.window.document.createElement("h1");
            h1.innerHTML = this.escapeHtml(text);
            return h1;
        });
    }
    addLink(text, destination) {
        this.addInDiv(this.dom, () => {
            const div = this.dom.window.document.createElement("a");
            div.innerHTML = this.escapeHtml(text);
            div.setAttribute("href", destination);
            return div;
        });
    }
    addPicture(alttext, imgsrc) {
        this.addInDiv(this.dom, () => {
            const img = this.dom.window.document.createElement("img");
            img.setAttribute("alt", alttext);
            img.setAttribute("src", imgsrc);
            return img;
        });
    }
    setTitle(title) {
        this.dom.window.document.title = title;
    }
    serialize() {
        return this.dom.serialize();
    }
    addInDiv(dom, func) {
        const div = dom.window.document.createElement("div");
        const elem = func();
        div.appendChild(elem);
        dom.window.document.body.appendChild(div);
    }
    escapeHtml(s) {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
exports.Dom = Dom;
//# sourceMappingURL=dom-utils.js.map