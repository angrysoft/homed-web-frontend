import { Trait } from "./Trait.js";
export declare class TemperatureStatusView extends Trait {
    private label;
    private temp;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
