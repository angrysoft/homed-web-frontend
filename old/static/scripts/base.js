export { BaseComponent };
class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.html = '';
        this.sheet = new CSSStyleSheet();
        this.root = this.attachShadow({ mode: 'open' });
    }
    adoptedCallback() {
        console.log('I am adopted!');
    }
    connectedCallback() {
        if (this.root.adoptedStyleSheets.length === 0) {
            this.root.adoptedStyleSheets = [this.sheet];
        }
    }
    render() {
        this.root.innerHTML = this.html;
    }
}
