import { Trait } from "./Trait.js";
export declare class RgbView extends Trait {
    private inputColor;
    label: HTMLLabelElement;
    constructor();
    static get observedAttributes(): string[];
    private rgbIntToHex;
    private hexToRgbInt;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
