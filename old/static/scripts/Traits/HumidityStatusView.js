import { Trait } from "./Trait.js";
export class HumidityStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = HumidityStatusView.attr;
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
        this.label.innerText = "Humidity:";
        this.humidity = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.humidity);
    }
    static get observedAttributes() {
        return HumidityStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "humidity") {
            this.humidity.innerText = `${newValue} %`;
        }
    }
}
HumidityStatusView.attr = ['humidity'];
window.customElements.define('humidity-view', HumidityStatusView);
