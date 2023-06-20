import { BaseComponent } from "./BaseComponent.js";
export declare class Button extends BaseComponent {
    private buttonName;
    private buttonElement;
    constructor(name: string);
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    private setColor;
    set name(value: string);
    get name(): string;
}
