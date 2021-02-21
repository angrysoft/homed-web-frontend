export { PlaceTab };
import { BaseComponent } from "./base.js";
import { DeviceInstance } from "./devices.js";

class PlaceTab extends BaseComponent {

    constructor(id:string) {
        super();
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

    public addDeviceFromInfo(devInfo: Object) {
        this.appendChild(new DeviceInstance(devInfo));
    }

    public show() {
        console.log(this.root.adoptedStyleSheets);
        this.root.adoptedStyleSheets[0].rules[0].style.display = 'grid';
        // this.root.classList.add('Active');
    }

    public hide() {
        this.root.adoptedStyleSheets[0].rules[0].display = 'none';
        this.root.classList.remove('Active');
    }
}

window.customElements.define('place-tab', PlaceTab);