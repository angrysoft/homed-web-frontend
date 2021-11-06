import { Button } from "../components.js";
import { Trait } from "./Trait";

export class VolumeView extends Trait {
    private buttons: Object = { 'vol+': 'volume_up', 'mute': 'mute', 'vol-': 'volume_down' };
    static attr: Array<string> = [];

    constructor() {
        super();
        this.statusList = VolumeView.attr;
        this._sendCommands = true;

        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: volume;
            grid-template-areas: "volume_up mute volume_down";
        }`);

        Object.keys(this.buttons).forEach((btnName) => {
            let btn: Button = new Button(btnName);
            btn.addEventListener("click", (el) => {
                this.dispatchEvent(new CustomEvent('send-command', { detail: [this.buttons[btnName], null] }));
            });
            btn.style.gridArea = this.buttons[btnName];
            btn.setAttribute("color", this.buttons[btnName]);
            this.root.appendChild(btn);
        });

    }

    static get observedAttributes() {
        return VolumeView.attr;
    }
}

window.customElements.define('volume-view', VolumeView);
