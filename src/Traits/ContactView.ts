import { Trait } from "./Trait";

export class ContactView  extends Trait {
    private label: HTMLLabelElement;
    private status: HTMLElement;
    static attr: Array<string> = ['contact'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = ContactView.attr;

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
        this.label.innerText = "Status:";
        this.status = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.status);

    }

    static get observedAttributes() {
        return ContactView.attr;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "contact") {
            this.status.innerText = newValue;
        }
    }
}

window.customElements.define('contact-view', ContactView);
