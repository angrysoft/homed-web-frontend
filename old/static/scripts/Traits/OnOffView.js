import { ButtonSmall } from "../WebComponents/ButtonSmall.js";
import { Trait } from "./Trait.js";
export class OnOffView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = OnOffView.attr;
        this._sendCommands = true;
        this.cssSheet.insertRule(`:host {
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
    attributeChangedCallback(name, oldValue, newValue) {
        newValue = newValue.toLowerCase();
        if (oldValue != newValue && name === "power") {
            this.button.setAttribute('color', newValue);
            if (newValue === "on") {
                this.button.name = "off";
                this.setAttribute("cmd", "off");
            }
            else {
                this.button.name = "on";
                this.setAttribute("cmd", "on");
            }
        }
    }
}
OnOffView.attr = ['power'];
window.customElements.define('onoff-view', OnOffView);
