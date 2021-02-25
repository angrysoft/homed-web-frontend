import { BaseComponent, ButtonSmall } from "./components.js";
export { TraitsFactory, Trait };

class TraitsFactory {
    static getTrait(traitName:string): Trait | undefined {
        let ret: Trait | undefined = undefined;

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
                console.log(`unsupported trait: ${traitName}`);
                break;
            }
        }
        return ret;
    }
    
}

class Trait extends BaseComponent {
    protected statusList: Array<string> = [];

    constructor() {
        super();
    }

    public getStatusList(): Array<string> {
        return this.statusList;
    }

    public attributeChangedCallback(name:string, oldValue, newValue) {
         
    }
 
}

class OnOffView extends Trait {
    private wrapper: HTMLElement;
    private button: ButtonSmall;

    constructor() {
        super();
        this.statusList = ['power'];

        this.sheet.insertRule(`div {
            display: grid;
            justify-content: center;
        }`);
        this.wrapper = document.createElement("div");
        this.button = new ButtonSmall("on");
        this.wrapper.appendChild(this.button);
        this.root.appendChild(this.wrapper);
    }
    
    static get observedAttributes() {
        return ['power'];
    }

    public attributeChangedCallback(name:string, oldValue, newValue) {
        if (oldValue != newValue && name === "power") {
            this.button.setAttribute('color', newValue);
            if (newValue === "on") {
                this.button.name = "off";
            } else {
                this.button.name = "on";
            }
        }
    }
}

window.customElements.define('onoff-view', OnOffView);