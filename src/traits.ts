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

            case "Rgb": {
                ret = new RgbView();
                break;
            }
            default: {
                console.log(`unsupported trait: ${traitName}`);
                break;
            }
        }
        return ret;
    }
    
}

class Trait extends BaseComponent {
    protected  _sendCommands:boolean = false;
    protected statusList: Array<string> = [];

    constructor() {
        super();
    }

    public getStatusList(): Array<string> {
        return this.statusList;
    }

    public attributeChangedCallback(name:string, oldValue, newValue) {
         
    }

    get sendCommands() {
        return this._sendCommands;
    }
 
}

class OnOffView extends Trait {
    private wrapper: HTMLElement;
    private button: ButtonSmall;

    constructor() {
        super();
        this.statusList = ['power'];
        this._sendCommands = true;

        // this.sheet.insertRule(`:host {
        //     grid-area: onoff;
        // }`);
        
        this.sheet.insertRule(`div {
            display: grid;
            justify-content: center;
        }`);
        this.wrapper = document.createElement("div");
        this.button = new ButtonSmall("on");
        this.wrapper.appendChild(this.button);
        this.root.appendChild(this.wrapper);

        this.button.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: `power.${this.getAttribute("power")}`}));
        });
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

class RgbView extends Trait {
    private template = document.createElement("template");
    
    private wrapper: HTMLElement;
    private button: ButtonSmall;
    
    constructor() {
        super();
        this.statusList = ['rgb'];
        
        // this.sheet.insertRule(`:host {
        //     grid-area: rgb;
        // }`);

        this.sheet.insertRule(`div {
            display: grid;
            justify-content: center;
        }`);

        this.wrapper = document.createElement("div");
        this.button = new ButtonSmall("Color");
        this.wrapper.appendChild(this.button);
        this.root.appendChild(this.wrapper);
    }

    static get observedAttributes() {
        return ['rgb'];
    }
}


window.customElements.define('onoff-view', OnOffView);
window.customElements.define('rgb-view', RgbView);