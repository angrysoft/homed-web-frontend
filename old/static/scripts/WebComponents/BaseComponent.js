export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.html = '';
        this.root = this.attachShadow({ mode: 'open' });
        this.cssStyle = document.createElement("style");
        this.root.appendChild(this.cssStyle);
        this.cssStyle.textContent = "";
        this.cssSheet = this.cssStyle.sheet;
    }
    adoptedCallback() {
        console.log('I am adopted!');
    }
    connectedCallback() {
        if (this.root.adoptedStyleSheets.length === 0) {
            this.root.adoptedStyleSheets = [this.cssSheet];
        }
    }
    render() {
        this.root.innerHTML = this.html;
    }
}
