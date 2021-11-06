import { ButtonSmall } from "../components.js";
import { Trait } from "./Trait";

export class MultiSwitchView extends Trait {
    private buttonLeft: ButtonSmall;
    private buttonRight: ButtonSmall;
    static attr: Array<string> = ['left', 'right'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = MultiSwitchView.attr;
        this._sendCommands = true;

        this.sheet.insertRule(`:host {
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

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        newValue = newValue.toLowerCase();
        if (oldValue != newValue) {
            let button: ButtonSmall;
            let valueToSet: string;
            if (newValue === "on") {
                valueToSet = "off";
            } else {
                valueToSet = "on";
            }
            if (name === 'left') {
                button = this.buttonLeft;

            } else if (name === 'right') {
                button = this.buttonRight;
            } else { return; }
            button.setAttribute('color', newValue);
            button.name = valueToSet;
            this.setAttribute(`cmd-${name}`, valueToSet);
        }
    }
}

window.customElements.define('doubleswitch-view', MultiSwitchView);
