export { DeviceInstance };
import { BaseComponent } from "./base.js";

class DeviceView extends BaseComponent {
    
    constructor(id:string, name) {
        super();
        this.sheet.insertRule(`div.tabs {
            display: grid;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr auto;
            min-height:100%;
            align-content: center;
            background: orange;
        }`);
        this.id = id;
    }
    
    get name():string {
        return this.getAttribute('name') || '';
    }
    
    set name(value:string) {
        this.setAttribute('name', value);
    }
    
    
}

class DeviceInstance {
    private model: DeviceModel;
    private view: DeviceView;

    constructor(deviceInfo:Object) {
        this.model = new DeviceModel(deviceInfo);
        this.view =  new DeviceView(this.model.sid, this.model.name);

    }

}

class DeviceModel {
    private info: Object;
    constructor(deviceInfo:Object) {
        this.info = deviceInfo;
    }

    get sid():string {
        return this.info["sid"] || "";
    }
    
    
}

class TraitsFactory {
    
}

window.customElements.define('device-view', DeviceView);