import { Trait } from "./Traits.js";

export class IlluminanceStatusView extends Trait {
    private label: HTMLLabelElement;
    private illuminance: HTMLElement;
    static attr: Array<string> = ['illuminance'];

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

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "illuminance") {
            this.illuminance.innerText = `${newValue} LUX`;
        }
    }
}

window.customElements.define('illuminance-view', IlluminanceStatusView);
