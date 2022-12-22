export class BaseComponent extends HTMLElement {
    protected cssStyle: HTMLStyleElement;
    protected cssSheet: CSSStyleSheet;
    protected html: string = '';
    protected root;

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        // only chrom support CSSStyleSheet constructor
        this.cssSheet = new CSSStyleSheet();
        this.cssStyle = document.createElement("style");
        this.root.appendChild(this.cssStyle);
        this.cssStyle.textContent = "";
        // this.cssSheet = this.cssStyle.sheet as CSSStyleSheet;
    }

    public adoptedCallback() {
        console.log('I am adopted!');
    }

    public connectedCallback() {
        if (this.root.adoptedStyleSheets.length === 0) {
            this.root.adoptedStyleSheets = [this.cssSheet];
        }
    }

    public render() {
        this.root.innerHTML = this.html;
    }
}
