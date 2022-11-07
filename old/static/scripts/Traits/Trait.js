import { BaseComponent } from "../WebComponents/BaseComponent.js";
export class Trait extends BaseComponent {
    constructor() {
        super();
        this._sendCommands = false;
        this.statusList = [];
        this._showInMainView = false;
    }
    getStatusList(deviceInfo) {
        return this.statusList;
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    get sendCommands() {
        return this._sendCommands;
    }
    get showInMainView() {
        return this._showInMainView;
    }
}
