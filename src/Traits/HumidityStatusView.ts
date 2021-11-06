import { Trait } from "./Traits.js";

export class HumidityStatusView extends Trait {
    private label: HTMLLabelElement;
    private humidity: HTMLElement;
    static attr: Array<string> = ['humidity'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = HumidityStatusView.attr;

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
        this.label.innerText = "Humidity:";
        this.humidity = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.humidity);

    }

    static get observedAttributes() {
        return HumidityStatusView.attr;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "humidity") {
            this.humidity.innerText = `${newValue} %`;
        }
    }
}

window.customElements.define('humidity-view', HumidityStatusView);
