import { Trait } from "./Trait";

export class PressureStatusView extends Trait {
    private label: HTMLLabelElement;
    private temp: HTMLElement;
    static attr: Array<string> = ['pressure'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = PressureStatusView.attr;

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
        this.label.innerText = "Pressure:";
        this.temp = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.temp);

    }

    static get observedAttributes() {
        return PressureStatusView.attr;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "pressure") {
            this.temp.innerText = `${newValue} KPa`;
        }
    }
}

window.customElements.define('pressure-view', PressureStatusView);
