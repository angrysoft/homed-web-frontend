import { Trait } from "./Trait.js";
export declare class HumidityStatusView extends Trait {
    private label;
    private humidity;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
