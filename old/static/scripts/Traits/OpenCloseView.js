import { Trait } from "./Trait.js";
export class OpenCloseView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = OpenCloseView.attr;
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
        return OpenCloseView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "status") {
            this.status.innerText = newValue;
        }
    }
}
OpenCloseView.attr = ['status'];
window.customElements.define('openclose-view', OpenCloseView);
