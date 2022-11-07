import { Button } from "../WebComponents/Button.js";
import { Trait } from "./Trait.js";
export class MediaButtonsView extends Trait {
    constructor() {
        super();
        this.buttons = { ">": 'play', "||": 'pause', "[ ]": 'stop', ">>": 'rewind', "<<": 'forward' };
        this.statusList = MediaButtonsView.attr;
        this._sendCommands = true;
        this.cssSheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: mediaBtn;
            grid-template-areas: "play pause forward stop rewind";
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
        return MediaButtonsView.attr;
    }
}
MediaButtonsView.attr = [];
window.customElements.define('media-view', MediaButtonsView);
