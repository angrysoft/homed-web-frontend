import { Trait } from "./Trait.js";
export class IlluminanceStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = IlluminanceStatusView.attr;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 2fr;
            justify-content: center;
        }`);
        this.sheet.insertRule(`label {
            color: var(--widget-color);
            font-weight: 600;
        }`);
        this.label = document.createElement("label");
        this.label.innerText = "illuminance:";
        this.illuminance = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.illuminance);
    }
    static get observedAttributes() {
        return IlluminanceStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "illuminance") {
            this.illuminance.innerText = `${newValue} LUX`;
        }
    }
}
IlluminanceStatusView.attr = ['illuminance'];
window.customElements.define('illuminance-view', IlluminanceStatusView);
