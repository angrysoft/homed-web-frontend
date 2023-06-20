import { BaseComponent } from "./BaseComponent.js";
export class Button extends BaseComponent {
    constructor(name) {
        super();
        this.cssSheet.insertRule(`button {
            display: inline-block;
            transition:.2s ease-out;
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 36px;
            min-width: 64px;
            margin: 0;
            padding: 0 16px;
            border: none;
            border-radius: 2px;
            box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
            outline: none;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            text-decoration: none;
            text-align: center;
            letter-spacing: 0;
            vertical-align: middle;
            line-height: 36px;
            color: #000;
            cursor: pointer;
            background: var(--button-color);
        }`, 0);
        this.cssSheet.insertRule(`button:active {box-shadow:none;}`, 1);
        this.buttonElement = document.createElement("button");
        this.buttonName = document.createTextNode(name);
        this.buttonElement.appendChild(this.buttonName);
        this.root.appendChild(this.buttonElement);
    }
    static get observedAttributes() {
        return ['color'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "color":
                this.setColor(newValue);
                break;
        }
    }
    setColor(value) {
        let rule = this.cssSheet.cssRules[0];
        rule.style.background = `var(--button-${value})`;
    }
    set name(value) {
        this.buttonName.data = value;
    }
    get name() {
        return this.buttonName.data;
    }
}
window.customElements.get('button-normal') || window.customElements.define('button-normal', Button);
