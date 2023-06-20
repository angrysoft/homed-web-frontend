export { BaseComponent, Button, ButtonSmall, ModalBox, RangeSet };
declare class BaseComponent extends HTMLElement {
    protected sheet: CSSStyleSheet;
    protected html: string;
    protected root: any;
    constructor();
    adoptedCallback(): void;
    connectedCallback(): void;
    render(): void;
}
declare class Button extends BaseComponent {
    private buttonName;
    private buttonElement;
    constructor(name: string);
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private setColor;
    set name(value: string);
    get name(): string;
}
declare class ButtonSmall extends Button {
    constructor(name: string);
}
declare class ModalBox extends BaseComponent {
    private content;
    private header;
    private close;
    private body;
    private headerTitle;
    constructor();
    show(): void;
    hide(): void;
    set title(value: string);
    get title(): string;
    addBodyElement(el: BaseComponent): void;
}
declare class RangeSet extends BaseComponent {
    private input;
    private label;
    private sliderColor;
    constructor(name?: string, sliderColor?: string);
    set value(value: string);
    get value(): string;
}
