import { Trait } from "./Trait.js";
export class PressureStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = PressureStatusView.attr;
        this.cssSheet.insertRule(`:host {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 2fr;
            justify-content: center;
        }`);
        this.cssSheet.insertRule(`label {
            color: var(--widget-color);
            font-weight: 600;
        }`);
        this.label = document.createElement("label");
        this.label.innerText = "Pressure:";
        this.temp = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.temp);
    }
    static get observedAttributes() {
        return PressureStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "pressure") {
            this.temp.innerText = `${newValue} KPa`;
        }
    }
}
PressureStatusView.attr = ['pressure'];
window.customElements.define('pressure-view', PressureStatusView);