import { ButtonSmall } from "../WebComponents/ButtonSmall.js";
import { Trait } from "./Trait.js";
export class MultiSwitchView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = MultiSwitchView.attr;
        this._sendCommands = true;
        this.cssSheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
        }`);
        this.buttonLeft = new ButtonSmall("on");
        this.buttonLeft.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: [this.getAttribute("cmd-left"), 'left'] }));
        });
        this.buttonRight = new ButtonSmall("on");
        this.buttonRight.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: [this.getAttribute("cmd-right"), 'right'] }));
        });
        this.root.appendChild(this.buttonLeft);
        this.root.appendChild(this.buttonRight);
    }
    static get observedAttributes() {
        return MultiSwitchView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        newValue = newValue.toLowerCase();
        if (oldValue != newValue) {
            let button;
            let valueToSet;
            if (newValue === "on") {
                valueToSet = "off";
            }
            else {
                valueToSet = "on";
            }
            if (name === 'left') {
                button = this.buttonLeft;
            }
            else if (name === 'right') {
                button = this.buttonRight;
            }
            else {
                return;
            }
            button.setAttribute('color', newValue);
            button.name = valueToSet;
            this.setAttribute(`cmd-${name}`, valueToSet);
        }
    }
}
MultiSwitchView.attr = ['left', 'right'];
window.customElements.define('doubleswitch-view', MultiSwitchView);
