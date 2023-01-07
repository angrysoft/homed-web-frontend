import { RangeSet } from "../WebComponents/RangeSet.js";
import { Trait } from "./Trait.js";
export class DimmerView extends Trait {
    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['bright'];
        this.cssSheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            grid-area: bright;
            justify-content: center;
        }`);
        this.inputBright = new RangeSet("Bright", "linear-gradient(to right, black, white)");
        this.root.appendChild(this.inputBright);
        this.inputBright.addEventListener('change', () => {
            console.log('event re-emited');
            this.setAttribute('bright', this.inputBright.value);
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['set_bright', Number(this.inputBright.value)] }));
        });
    }
    static get observedAttributes() {
        return ['bright'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue && name === "bright") {
            let intValue = parseInt(newValue);
            if (intValue <= 100 && intValue >= 1) {
                this.inputBright.value = newValue;
            }
            else {
                this.setAttribute('bright', oldValue);
            }
        }
    }
}
window.customElements.define('dimmer-view', DimmerView);