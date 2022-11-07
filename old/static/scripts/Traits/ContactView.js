import { Trait } from "./Trait.js";
export class ContactView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = ContactView.attr;
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
        this.label.innerText = "Status:";
        this.status = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.status);
    }
    static get observedAttributes() {
        return ContactView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "contact") {
            this.status.innerText = newValue;
        }
    }
}
ContactView.attr = ['contact'];
window.customElements.define('contact-view', ContactView);
