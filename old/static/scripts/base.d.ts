export { BaseComponent };
declare class BaseComponent extends HTMLElement {
    protected sheet: CSSStyleSheet;
    protected html: string;
    protected root: any;
    constructor();
    adoptedCallback(): void;
    connectedCallback(): void;
    render(): void;
}
