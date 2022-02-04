import { Button } from "./Button.js";

export class ButtonSmall extends Button {
    constructor(name: string) {
        super(name);
        let rule: CSSStyleRule = this.cssSheet.cssRules[0] as CSSStyleRule;
        rule.style.fontSize = "12px";
        rule.style.height = "24px";
        rule.style.width = "100%";
        rule.style.minWidth = "48px";
        rule.style.padding = "0 8px";
        rule.style.lineHeight = "24px";
    }
}


window.customElements.get('button-small') || window.customElements.define('button-small', ButtonSmall);
