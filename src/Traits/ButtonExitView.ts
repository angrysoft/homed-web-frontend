import { Button } from "../components.js";
import { Trait } from "./Trait";

export class ButtonExitView extends Trait {
    static attr: Array<string> = [];

    constructor() {
        super();
        this.statusList = ButtonExitView.attr;
        this._sendCommands = true;

        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            grid-area: exit;
            justify-content: center;
            
        }`);

        let btn: Button = new Button("exit");
        btn.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['exit', null] }));
        });
        btn.setAttribute("color", "exit");
        this.root.appendChild(btn);
    }

    static get observedAttributes() {
        return ButtonExitView.attr;
    }
}

window.customElements.define('exit-view', ButtonExitView);
