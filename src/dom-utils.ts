import jsdom = require("jsdom");

export class Dom {

    private dom: jsdom.JSDOM;

    public constructor() {
        this.dom = new jsdom.JSDOM(`
            <!DOCTYPE html>
            <head>
            </head>
            <body></body>
        `);
    }

    public addText(text: string): void {
        this.addInDiv(this.dom, () => {
            const div = this.dom.window.document.createElement("div");
            div.innerHTML = this.escapeHtml(text);
            return div;
        });
    }

    public addH1(text: string): void {
        this.addInDiv(this.dom, () => {
            const h1 = this.dom.window.document.createElement("h1");
            h1.innerHTML = this.escapeHtml(text);
            return h1;
        });
    }

    public addLink(text: string, destination: string): void {
        this.addInDiv(this.dom, () => {
            const div = this.dom.window.document.createElement("a");
            div.innerHTML = this.escapeHtml(text);
            div.setAttribute("href", destination);
            return div;
        });
    }

    public addPicture(alttext: string, imgsrc: string): void {
        this.addInDiv(this.dom, () => {
            const img = this.dom.window.document.createElement("img");
            img.setAttribute("alt", alttext);
            img.setAttribute("src", imgsrc);
            return img;
        });
    }

    public setTitle(title: string): void {
        this.dom.window.document.title = title;
    }

    public serialize(): string {
        return this.dom.serialize();
    }

    private addInDiv(dom: jsdom.JSDOM, func: () => HTMLElement): void {
        const div = dom.window.document.createElement("div");
        const elem = func();
        div.appendChild(elem);
        dom.window.document.body.appendChild(div);
    }

    private escapeHtml(s: string): string {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

}
