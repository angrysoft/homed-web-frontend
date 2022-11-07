export declare class BaseComponent extends HTMLElement {
    protected cssStyle: HTMLStyleElement;
    protected cssSheet: CSSStyleSheet;
    protected html: string;
    protected root: any;
    constructor();
    adoptedCallback(): void;
    connectedCallback(): void;
    render(): void;
}
