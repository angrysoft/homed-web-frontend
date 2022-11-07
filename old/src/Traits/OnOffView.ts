import { ButtonSmall } from "../components.js";
import { Trait } from "./Trait.js";

export class OnOffView extends Trait {
    private button: ButtonSmall;
    static attr: Array<string> = ['power'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = OnOffView.attr;
        this._sendCommands = true;

        this.sheet.insertRule(`:host {
            display: grid;
            justify-content: center;
        }`);

        this.button = new ButtonSmall("on");
        this.root.appendChild(this.button);

        this.button.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: [this.getAttribute("cmd"), null] }));
        });
    }

    static get observedAttributes() {
        return OnOffView.attr;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        newValue = newValue.toLowerCase();
        if (oldValue != newValue && name === "power") {
            this.button.setAttribute('color', newValue);

            if (newValue === "on") {
                this.button.name = "off";
                this.setAttribute("cmd", "off");
            } else {
                this.button.name = "on";
                this.setAttribute("cmd", "on");
            }
        }
    }
}

window.customElements.define('onoff-view', OnOffView);
