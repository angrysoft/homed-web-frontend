import { BaseComponent } from "./BaseComponent.js";
export declare class RangeSet extends BaseComponent {
    private input;
    private label;
    private sliderColor;
    constructor(name?: string, sliderColor?: string);
    set value(value: string);
    get value(): string;
}
