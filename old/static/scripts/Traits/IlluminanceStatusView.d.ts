import { Trait } from "./Trait.js";
export declare class IlluminanceStatusView extends Trait {
    private label;
    private illuminance;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
