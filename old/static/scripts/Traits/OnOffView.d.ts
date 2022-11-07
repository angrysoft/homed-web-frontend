import { Trait } from "./Trait.js";
export declare class OnOffView extends Trait {
    private button;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
