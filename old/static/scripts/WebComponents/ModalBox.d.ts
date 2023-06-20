import { BaseComponent } from "./BaseComponent.js";
export declare class ModalBox extends BaseComponent {
    private content;
    private header;
    private close;
    private body;
    private headerTitle;
    constructor();
    show(): void;
    hide(): void;
    set title(value: string);
    get title(): string;
    addBodyElement(el: BaseComponent): void;
}
