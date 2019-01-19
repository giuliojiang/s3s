import jsdom = require("jsdom");

export class DomUtils {

    public static createNewDocument(): jsdom.JSDOM {
        const dom = new jsdom.JSDOM(`
        <!DOCTYPE html>
        <head>
        </head>
        <body></body>
        `);
        return dom;
    }

    public static addText(dom: jsdom.JSDOM, text: string): void {
        this.addInDiv(dom, () => {
            const div = dom.window.document.createElement("div");
            div.innerHTML = this.escapeHtml(text);
            return div;
        });
    }

    public static addH1(dom: jsdom.JSDOM, text: string): void {
        this.addInDiv(dom, () => {
            const h1 = dom.window.document.createElement("h1");
            h1.innerHTML = this.escapeHtml(text);
            return h1;
        });
    }

    public static addLink(dom: jsdom.JSDOM, text: string, destination: string): void {
        this.addInDiv(dom, () => {
            const div = dom.window.document.createElement("a");
            div.innerHTML = this.escapeHtml(text);
            div.setAttribute("href", destination);
            return div;
        });
    }

    public static addPicture(dom: jsdom.JSDOM, alttext: string, imgsrc: string): void {
        this.addInDiv(dom, () => {
            const img = dom.window.document.createElement("img");
            img.setAttribute("alt", alttext);
            img.setAttribute("src", imgsrc);
            return img;
        });
    }

    public static setTitle(dom: jsdom.JSDOM, title: string): void {
        dom.window.document.title = title;
    }

    private static addInDiv(dom: jsdom.JSDOM, func: () => HTMLElement): void {
        const div = dom.window.document.createElement("div");
        const elem = func();
        div.appendChild(elem);
        dom.window.document.body.appendChild(div);
    }

    private static escapeHtml(s: string): string {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

}
