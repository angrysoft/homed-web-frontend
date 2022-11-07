import { Trait } from "./Trait.js";

export class RgbView extends Trait {
    private inputColor: HTMLInputElement;
    public label: HTMLLabelElement;


    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['rgb'];

        this.sheet.insertRule(`input[type=color] {
            width:100%;
            min-height: 4rem;
        }`);

        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 0.8fr;
            gap: 1rem;
            justify-content: center;
            grid-area: color;
        }`);

        this.label = document.createElement("label");
        this.label.innerText = "Color";
        this.inputColor = document.createElement("input");
        this.inputColor.type = "color";
        this.root.appendChild(this.label);
        this.root.appendChild(this.inputColor);

        this.inputColor.addEventListener("change", (el) => {
            this.setAttribute('rgb', this.hexToRgbInt(this.inputColor.value));
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['set_color', Number(this.getAttribute("rgb"))] }));
        });
    }

    static get observedAttributes() {
        return ['rgb'];
    }

    private rgbIntToHex(rgb: string): string {
        let rgbInt = parseInt(rgb);
        let b = rgbInt & 255;
        let g = (rgbInt >> 8) & 255;
        let r = (rgbInt >> 16) & 255;
        console.log(r, g, b, `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    }

    private hexToRgbInt(hexColor: string): string {
        return parseInt(hexColor.substr(1), 16).toString();
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue != newValue && name === "rgb") {
            this.inputColor.value = this.rgbIntToHex(newValue);
        }
    }
}

window.customElements.define('rgb-view', RgbView);
