import { Trait } from "./Trait.js";
export class TemperatureStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = TemperatureStatusView.attr;
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
        this.label.innerText = "Temp:";
        this.temp = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.temp);
    }
    static get observedAttributes() {
        return TemperatureStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "temperature") {
            this.temp.innerText = `${newValue} C`;
        }
    }
}
TemperatureStatusView.attr = ['temperature'];
window.customElements.define('temp-view', TemperatureStatusView);
