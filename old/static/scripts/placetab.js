export { PlaceTab };
import { BaseComponent } from "./base.js";
import { DeviceInstance } from "./devices.js";
class PlaceTab extends BaseComponent {
    constructor(id) {
        super();
        this.devices = [];
        this.id = id;
        this.sheet.insertRule(`:host {
            display: none;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto;
            min-height:100%;
            align-content: center;
            background: orange;
        }`);
    }
    addDeviceFromInfo(devInfo) {
        let dev = new DeviceInstance(devInfo);
        this.devices.push(dev);
        this.appendChild(dev.getView());
    }
    show() {
        this.root.adoptedStyleSheets[0].rules[0].style.display = 'grid';
    }
    hide() {
        this.root.adoptedStyleSheets[0].rules[0].display = 'none';
    }
}
window.customElements.define('place-tab', PlaceTab);
