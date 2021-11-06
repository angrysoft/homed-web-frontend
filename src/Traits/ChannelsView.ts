import { Button } from "../components.js";
import { Trait } from "./Trait";

export class ChannelsView extends Trait {
    private buttons: Object = { 'ch+': 'channel_up', 'ch-': 'channel_down' };
    static attr: Array<string> = [];

    constructor() {
        super();
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
        return ChannelsView.attr;
    }
}

window.customElements.define('channels-view', ChannelsView);
