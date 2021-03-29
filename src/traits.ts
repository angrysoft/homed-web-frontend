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

            case "DoubleSwitch": {
                ret = new DoubleSwitchView();
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

            case "TemperatureStatus": {
                ret = new TemperatureStatusView();
                break;
            }

            case "PressureStatus": {
                ret = new PressureStatusView();
                break;
            }

            case "HumidityStatus": {
                ret = new HumidityStatusView();
                break;
            }

            case "OpenClose": {
                ret = new OpenCloseView();
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

    public getStatusList(deviceInfo:Object): Array<string> {
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

class DoubleSwitchView extends Trait {
    private buttonOne: ButtonSmall;
    private buttonTwo: ButtonSmall;
    static attr: Array<string> = ['one', 'two'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = DoubleSwitchView.attr;
        this._sendCommands = true;
        
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.1rem;
            grid-auto-flow: column;
            justify-content: center;
        }`);

        this.buttonOne = new ButtonSmall("on");
        this.buttonOne.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: `one.${this.getAttribute("cmd-one")}`}));
        });

        this.buttonTwo = new ButtonSmall("on");
        this.buttonTwo.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: `two.${this.getAttribute("cmd-two")}`}));
        });
        this.root.appendChild(this.buttonOne);
        this.root.appendChild(this.buttonTwo);
        
    }
    
    static get observedAttributes() {
        return DoubleSwitchView.attr;
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue != newValue) {
            let button: ButtonSmall;
            let valueToSet:string;
            if (newValue === "on") {
                valueToSet = "off";
            } else {
                valueToSet = "on";
            }
            if (name === 'one') {
                button = this.buttonOne;
                
            } else if (name === 'two') {
                button = this.buttonTwo;
            } else { return }
            button.setAttribute('color', newValue);
            button.name = valueToSet;
            this.setAttribute(`cmd-${name}`, valueToSet);
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


class TemperatureStatusView extends Trait {
    private label: HTMLLabelElement;
    private temp: HTMLElement;
    static attr: Array<string> = ['temperature'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = TemperatureStatusView.attr;
       
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 2fr;
            justify-content: center;
        }`);

        this.sheet.insertRule(`label {
            color: var(--widget-color);
            font-weight: 600;
        }`);

        this.label = document.createElement("label");
        this.label.innerText = "Temp:";
        this.temp = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.temp);

    }
    
    static get observedAttributes() {
        return TemperatureStatusView.attr;
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        console.log(name ,oldValue, newValue);
        if (oldValue != newValue && name === "temperature") {
            this.temp.innerText = `${newValue} C`;
        }
    }
}

class PressureStatusView extends Trait {
    private label: HTMLLabelElement;
    private temp: HTMLElement;
    static attr: Array<string> = ['pressure'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = PressureStatusView.attr;
       
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 2fr;
            justify-content: center;
        }`);

        this.sheet.insertRule(`label {
            color: var(--widget-color);
            font-weight: 600;
        }`);

        this.label = document.createElement("label");
        this.label.innerText = "Pressure:";
        this.temp = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.temp);

    }
    
    static get observedAttributes() {
        return PressureStatusView.attr;
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        console.log(name ,oldValue, newValue);
        if (oldValue != newValue && name === "pressure") {
            this.temp.innerText = `${newValue} KPa`;
        }
    }
}

class HumidityStatusView extends Trait {
    private label: HTMLLabelElement;
    private humidity: HTMLElement;
    static attr: Array<string> = ['humidity'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = HumidityStatusView.attr;
       
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 2fr;
            justify-content: center;
        }`);

        this.sheet.insertRule(`label {
            color: var(--widget-color);
            font-weight: 600;
        }`);

        this.label = document.createElement("label");
        this.label.innerText = "Humidity:";
        this.humidity = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.humidity);

    }
    
    static get observedAttributes() {
        return HumidityStatusView.attr;
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        console.log(name ,oldValue, newValue);
        if (oldValue != newValue && name === "humidity") {
            this.humidity.innerText = `${newValue} %`;
        }
    }
}
class OpenCloseView extends Trait {
    private label: HTMLLabelElement;
    private status: HTMLElement;
    static attr: Array<string> = ['status'];

    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = OpenCloseView.attr;
       
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 2fr;
            justify-content: center;
        }`);

        this.sheet.insertRule(`label {
            color: var(--widget-color);
            font-weight: 600;
        }`);

        this.label = document.createElement("label");
        this.label.innerText = "Status:";
        this.status = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.status);

    }
    
    static get observedAttributes() {
        return OpenCloseView.attr;
    }
    
    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        console.log(name ,oldValue, newValue);
        if (oldValue != newValue && name === "status") {
            this.status.innerText = newValue;
        }
    }
}


window.customElements.define('onoff-view', OnOffView);
window.customElements.define('doubleswitch-view', DoubleSwitchView);
window.customElements.define('rgb-view', RgbView);
window.customElements.define('dimmer-view', DimmerView);
window.customElements.define('ct-view', ColorTemperatureView);
window.customElements.define('temp-view', TemperatureStatusView);
window.customElements.define('pressure-view', PressureStatusView);
window.customElements.define('humidity-view', HumidityStatusView);
window.customElements.define('openclose-view', OpenCloseView);