import { BaseComponent, ButtonSmall, RangeSet } from "./components.js";
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
            

            case "Dimmer": {
                ret = new DimmerView();
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
    protected _showInMainView: boolean = false;

    constructor() {
        super();
    }

    public getStatusList(): Array<string> {
        return this.statusList;
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
         
    }

    get sendCommands() {
        return this._sendCommands;
    }

    get showInMainView():boolean {
        return this._showInMainView;
    }
 
}

class OnOffView extends Trait {
    private wrapper: HTMLElement;
    private button: ButtonSmall;

    constructor() {
        super();
        this._showInMainView = true;
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
            this.dispatchEvent(new CustomEvent('send-command', { detail: `power.${this.getAttribute("cmd")}`}));
        });
    }
    
    static get observedAttributes() {
        return ['power'];
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "power") {
            this.button.setAttribute('color', newValue);
            
            if (newValue === "on") {
                this.button.name = "off";
                this.setAttribute("cmd", "off");
            } else {
                this.button.name = "on";
                this.setAttribute("cmd", "on");
            }
        }
    }
}

class RgbView extends Trait {
    private inputColor: HTMLInputElement;
    public label: HTMLLabelElement;
    
    constructor() {
        super();
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
        }`);

        this.label = document.createElement("label");
        this.label.innerText = "Color";
        this.inputColor = document.createElement("input");
        this.inputColor.type = "color";
        this.root.appendChild(this.label);
        this.root.appendChild(this.inputColor);
    }

    static get observedAttributes() {
        return ['rgb'];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "rgb") {
            let rgb = parseInt(newValue);
            let b =  rgb & 255;
            let g = (rgb >> 8) & 255;
            let r =   (rgb >> 16) & 255;
            this.inputColor.value = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        }
    }
}

class DimmerView extends Trait {
    private inputBright: RangeSet;
    
    constructor() {
        super();
        this.statusList = ['bright'];
        
        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            justify-content: center;
        }`);

        this.inputBright = new RangeSet("Bright");
        this.root.appendChild(this.inputBright);
    }

    static get observedAttributes() {
        return ['bright'];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "bright") {
            this.inputBright.value = newValue;
        }
    }
}


window.customElements.define('onoff-view', OnOffView);
window.customElements.define('rgb-view', RgbView);
window.customElements.define('dimmer-view', DimmerView);