import { Trait } from "./Trait.js";
export declare class DimmerView extends Trait {
    private inputBright;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
