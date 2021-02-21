export { BaseComponent };

class BaseComponent extends HTMLElement {
    protected sheet:CSSStyleSheet;
    protected html:string = '';
    protected root;

    constructor() {
        super();
        this.sheet = new CSSStyleSheet();
        this.root = this.attachShadow({ mode: 'open'});
    }

    public adoptedCallback() {
        console.log('I am adopted!');
    }

    public connectedCallback() {
        if (this.root.adoptedStyleSheets.length === 0) {
            this.root.adoptedStyleSheets = [ this.sheet ];
        }
    }

    public render() {
        this.root.innerHTML = this.html;
    }
}