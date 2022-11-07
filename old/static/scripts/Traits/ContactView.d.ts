import { Trait } from "./Trait.js";
export declare class ContactView extends Trait {
    private label;
    private status;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
