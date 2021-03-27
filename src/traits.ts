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

            case "MultiSwitch": {
                ret = new MultiSwitchView();
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

            case "ColorTemperature": {
                ret = new ColorTemperatureView();
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
    private button: ButtonSmall;
    static attr: Array<string> = ['power'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = OnOffView.attr;
        this._sendCommands = true;
        
        this.sheet.insertRule(`:host {
            display: grid;
            justify-content: center;
        }`);

        this.button = new ButtonSmall("on");
        this.root.appendChild(this.button);

        this.button.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: `power.${this.getAttribute("cmd")}`}));
        });
    }
    
    static get observedAttributes() {
        return OnOffView.attr;
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

class MultiSwitchView extends Trait {
    // private switches: Array<ButtonSmall>;
    static attr: Array<string> = ['switches'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = MultiSwitchView.attr;
        this._sendCommands = true;
        
        this.sheet.insertRule(`:host {
            display: grid;
            justify-content: center;
        }`);

        // this.button = new ButtonSmall("on");
        // this.root.appendChild(this.wrapper);

        // this.button.addEventListener("click", (el) => {
        //     this.dispatchEvent(new CustomEvent('send-command', { detail: `power.${this.getAttribute("cmd")}`}));
        // });
    }
    
    static get observedAttributes() {
        return MultiSwitchView.attr;
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "switches") {
            console.log('attr switech', newValue);
            // this.button.setAttribute('color', newValue);
            
            // if (newValue === "on") {
            //     this.button.name = "off";
            //     this.setAttribute("cmd", "off");
            // } else {
            //     this.button.name = "on";
            //     this.setAttribute("cmd", "on");
            // }
        }
    }
}

class RgbView extends Trait {
    private inputColor: HTMLInputElement;
    public label: HTMLLabelElement;
    
    
    constructor() {
        super();
        this._sendCommands = true;
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

        this.inputColor.addEventListener("change", (el) => {
            this.setAttribute('rgb', this.hexToRgbInt(this.inputColor.value));
            this.dispatchEvent(new CustomEvent('send-command', { detail: `set_color.${this.getAttribute("rgb")}`}));
        });
    }

    static get observedAttributes() {
        return ['rgb'];
    }
    
    private rgbIntToHex(rgb:string): string {
        let rgbInt = parseInt(rgb);
        let b =  rgbInt & 255;
        let g = (rgbInt >> 8) & 255;
        let r =   (rgbInt >> 16) & 255;
        console.log(r,g,b,`#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
        return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        
    }

    private hexToRgbInt(hexColor:string): string {
        return parseInt(hexColor.substr(1), 16).toString();
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "rgb") {
            this.inputColor.value = this.rgbIntToHex(newValue);
        }
    }
 
}

class DimmerView extends Trait {
    private inputBright: RangeSet;
    
    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['bright'];
        
        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            justify-content: center;
        }`);

        this.inputBright = new RangeSet("Bright", "linear-gradient(to right, black, white)");
        this.root.appendChild(this.inputBright);

        this.inputBright.addEventListener('change', () => {
            console.log('event re-emited');
            this.setAttribute('bright', this.inputBright.value);
            this.dispatchEvent(new CustomEvent('send-command', { detail: `set_bright.${this.inputBright.value}`}));
        });
    }

    static get observedAttributes() {
        return ['bright'];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "bright") {
            let intValue = parseInt(newValue);
          if (intValue <= 100 && intValue >= 1) {
              this.inputBright.value = newValue;
          } else {
              this.setAttribute('bright', oldValue);
          }
        }
    }
}

class ColorTemperatureView extends Trait {
    private inputCT: RangeSet;
    
    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['ct_pc'];
        
        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            justify-content: center;
        }`);

        this.inputCT = new RangeSet("Color Temperature", "linear-gradient(to right, orange, yellow, white)");
        this.root.appendChild(this.inputCT);

        this.inputCT.addEventListener('change', () => {
            console.log('event re-emited');
            this.setAttribute('ct_pc', this.inputCT.value);
            this.dispatchEvent(new CustomEvent('send-command', { detail: `set_ct_pc.${this.inputCT.value}`}));
        });
    }

    static get observedAttributes() {
        return ['ct_pc'];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue && name === "ct_pc") {
            console.log(`ct_pc set att ${oldValue} => ${newValue} for ${name}`)
            let intValue = parseInt(newValue);
          if (intValue <= 100 && intValue >= 1) {
              this.inputCT.value = newValue;
          } else {
              // wtf check pyiot for empty ct_pc
              this.setAttribute('ct_pc', oldValue || "50");
          }
        }
    }
}


window.customElements.define('onoff-view', OnOffView);
window.customElements.define('multiswitch-view', MultiSwitchView);
window.customElements.define('rgb-view', RgbView);
window.customElements.define('dimmer-view', DimmerView);
window.customElements.define('ct-view', ColorTemperatureView);