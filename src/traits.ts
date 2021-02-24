import { BaseComponent, ButtonSmall } from "./components.js";
export { TraitsFactory };

class TraitsFactory {
    static getTrait(traitName:string): BaseComponent | undefined {
        let ret: BaseComponent | undefined = undefined;

        switch(traitName) {
            case "OnOff": {
                ret = new OnOffView();
                break;
            }

            case "Rgb": {
                ret = new OnOffView();
                break;
            }
            default: {
                console.log(traitName);
                break;
            }
        }
        return ret;
    }
    
}

class OnOffView extends BaseComponent {
    private wrapper: HTMLElement;
    private button: HTMLElement;

    constructor() {
        super()
        this.sheet.insertRule(`div {
            display: grid;
            justify-content: center;
        }`);
        this.wrapper = document.createElement("div");
        this.button = new ButtonSmall("on");
        this.wrapper.appendChild(this.button);
        this.root.appendChild(this.wrapper);
    }
    
    // return attributes to update
}

window.customElements.define('onoff-view', OnOffView);