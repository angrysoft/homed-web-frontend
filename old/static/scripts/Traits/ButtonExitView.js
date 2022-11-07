import { Button } from "../WebComponents/Button.js";
import { Trait } from "./Trait.js";
export class ButtonExitView extends Trait {
    constructor() {
        super();
        this.statusList = ButtonExitView.attr;
        this._sendCommands = true;
        this.cssSheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            grid-area: exit;
            justify-content: center;
            
        }`);
        let btn = new Button("exit");
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
ButtonExitView.attr = [];
window.customElements.define('exit-view', ButtonExitView);
