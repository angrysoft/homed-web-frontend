import { BaseComponent } from "./components.js";
import { Trait } from "./traits.js";
export declare class DeviceView extends BaseComponent {
    private header;
    private traits;
    private traitsView;
    constructor(id: string, name: string, place: string);
    showTraitsView(): void;
    hideTraitsView(): void;
    render(): void;
    addTraitView(trait: Trait): void;
    get name(): string;
    set name(value: string);
    get place(): string;
    set place(value: string);
}
