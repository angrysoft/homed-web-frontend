import { BaseComponent } from "./components.js";
export { TraitsFactory, Trait };
declare class TraitsFactory {
    static getTrait(traitName: string): Trait | undefined;
}
declare class Trait extends BaseComponent {
    protected _sendCommands: boolean;
    protected statusList: Array<string>;
    protected _showInMainView: boolean;
    constructor();
    getStatusList(deviceInfo: Object): Array<string>;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    get sendCommands(): boolean;
    get showInMainView(): boolean;
}
