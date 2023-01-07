import { Trait } from "./Trait.js";
export class MotionStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = MotionStatusView.attr;
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
        this.label.innerText = "Occupancy:";
        this.occupancy = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.occupancy);
    }
    static get observedAttributes() {
        return MotionStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "occupancy") {
            this.occupancy.innerText = newValue;
        }
    }
}
MotionStatusView.attr = ['occupancy'];
window.customElements.define('occupancy-view', MotionStatusView);