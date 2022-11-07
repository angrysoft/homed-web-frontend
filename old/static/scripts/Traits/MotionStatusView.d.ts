import { Trait } from "./Trait.js";
export declare class MotionStatusView extends Trait {
    private label;
    private occupancy;
    static attr: Array<string>;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}
