import { RangeSet } from "../components.js";
import { Trait } from "./Trait.js";

export class ColorTemperatureView extends Trait {
    private inputCT: RangeSet;

    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['ct_pc'];

        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            grid-area: colorTemp;
            justify-content: center;
        }`);

        this.inputCT = new RangeSet("Color Temperature", "linear-gradient(to right, orange, yellow, white)");
        this.root.appendChild(this.inputCT);

        this.inputCT.addEventListener('change', () => {
            console.log('event re-emited');
            this.setAttribute('ct_pc', this.inputCT.value);
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['set_ct_pc', Number(this.inputCT.value)] }));
        });
    }

    static get observedAttributes() {
        return ['ct_pc'];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue != newValue && name === "ct_pc") {
            console.log(`ct_pc set att ${oldValue} => ${newValue} for ${name}`);
            let intValue = parseInt(newValue);
            if (intValue <= 100 && intValue >= 1) {
                this.inputCT.value = newValue;
            } else {
                // wtf check pyiot for empty ct_pc
                this.setAttribute('ct_pc', oldValue || "50");
            }
        }
    }
}

window.customElements.define('ct-view', ColorTemperatureView);
