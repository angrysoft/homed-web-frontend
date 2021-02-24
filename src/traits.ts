import { BaseComponent, ButtonSmall } from "./components.js";
export { TraitsFactory, Trait };

class TraitsFactory {
    static getTrait(traitName:string): BaseComponent | undefined {
        let ret: BaseComponent | undefined = undefined;

        switch(traitName) {
            case "OnOff": {
                ret = new OnOffView();
                break;
            }

            // case "Rgb": {
            //     ret = new OnOffView();
            //     break;
            // }
            default: {
                console.log(traitName);
                break;
            }
        }
        return ret;
    }
    
}

class Trait extends BaseComponent {
    // private statusList: Array<string> = [];

    constructor() {
        super();
    }

    // public getStatusList(): Array<string> {
    //     return this.cons;
    // }

    static get observedAttributes() {
        return [];
    }
 
}

class OnOffView extends Trait {
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
    
    
}

window.customElements.define('onoff-view', OnOffView);