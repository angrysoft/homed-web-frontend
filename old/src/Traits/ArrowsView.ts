import { Button } from "../components.js";
import { Trait } from "./Trait.js";

export class ArrowsView extends Trait {
    private buttons: Array<string> = ['up', 'left', 'ok', 'right', 'down'];
    static attr: Array<string> = [];

    constructor() {
        super();
        this.statusList = ArrowsView.attr;
        this._sendCommands = true;

        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: arrows;
            grid-template-areas: 
            ". up ."
            "left ok right"
            ". down .";
        }`);

        this.buttons.forEach((btnName) => {
            let btn: Button = new Button(btnName);
            btn.addEventListener("click", (el) => {
                this.dispatchEvent(new CustomEvent('send-command', { detail: [btnName, null] }));
            });
            btn.style.gridArea = btnName;
            btn.setAttribute("color", btnName);
            this.root.appendChild(btn);
        });

    }

    static get observedAttributes() {
        return ArrowsView.attr;
    }
}

window.customElements.define('arrow-view', ArrowsView);
