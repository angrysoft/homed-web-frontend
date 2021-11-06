import { Trait } from "./Trait";

export class TemperatureStatusView extends Trait {
    private label: HTMLLabelElement;
    private temp: HTMLElement;
    static attr: Array<string> = ['temperature'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = TemperatureStatusView.attr;

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
        this.label.innerText = "Temp:";
        this.temp = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.temp);

    }

    static get observedAttributes() {
        return TemperatureStatusView.attr;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "temperature") {
            this.temp.innerText = `${newValue} C`;
        }
    }
}

window.customElements.define('temp-view', TemperatureStatusView);
