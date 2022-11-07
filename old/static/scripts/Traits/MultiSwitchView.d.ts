import { Trait } from "./Trait.js";
export declare class MultiSwitchView extends Trait {
    private buttonLeft;
    private buttonRight;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
