import { Trait } from "./Trait.js";
export declare class ColorTemperatureView extends Trait {
    private inputCT;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
