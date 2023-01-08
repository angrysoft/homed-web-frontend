import { Button } from "../components.js";
import { Trait } from "./Trait.js";
export class ChannelsView extends Trait {
    constructor() {
        super();
        this.buttons = { 'ch+': 'channel_up', 'ch-': 'channel_down' };
        this.statusList = ChannelsView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: channel;
            grid-template-areas: "channel_up channel_down";
        }`);
        Object.keys(this.buttons).forEach((btnName) => {
            let btn = new Button(btnName);
            btn.addEventListener("click", (el) => {
                this.dispatchEvent(new CustomEvent('send-command', { detail: [this.buttons[btnName], null] }));
            });
            btn.style.gridArea = this.buttons[btnName];
            btn.setAttribute("color", this.buttons[btnName]);
            this.root.appendChild(btn);
        });
    }
    static get observedAttributes() {
        return ChannelsView.attr;
    }
}
ChannelsView.attr = [];
window.customElements.define('channels-view', ChannelsView);
