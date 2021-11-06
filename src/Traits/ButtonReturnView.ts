import { Button } from "../components.js";
import { Trait } from "./Trait.js";

export class ButtonReturnView extends Trait {
    static attr: Array<string> = [];

    constructor() {
        super();
        this.statusList = ButtonReturnView.attr;
        this._sendCommands = true;

        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            grid-area: return;
            justify-content: center;
            
        }`);

        let btn: Button = new Button("ret");
        btn.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['ret', null] }));
        });
        btn.setAttribute("color", "ret");
        this.root.appendChild(btn);
    }

    static get observedAttributes() {
        return ButtonReturnView.attr;
    }
}

window.customElements.define('return-view', ButtonReturnView);
