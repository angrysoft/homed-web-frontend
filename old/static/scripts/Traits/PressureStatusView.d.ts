import { Trait } from "./Trait.js";
export declare class PressureStatusView extends Trait {
    private label;
    private temp;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
