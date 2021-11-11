import { BaseComponent } from "../WebComponents/BaseComponent.js";

export class Trait extends BaseComponent {
    protected _sendCommands: boolean = false;
    protected statusList: Array<string> = [];
    protected _showInMainView: boolean = false;

    constructor() {
        super();
    }

    public getStatusList(deviceInfo: Object): Array<string> {
        return this.statusList;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    }

    get sendCommands() {
        return this._sendCommands;
    }

    get showInMainView(): boolean {
        return this._showInMainView;
    }
}
