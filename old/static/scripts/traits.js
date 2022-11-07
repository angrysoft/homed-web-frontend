import { BaseComponent, ButtonSmall, Button, RangeSet } from "./components.js";
export { TraitsFactory, Trait };
class TraitsFactory {
    static getTrait(traitName) {
        let ret = undefined;
        switch (traitName) {
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
            case "MotionStatus": {
                ret = new MotionStatusView();
                break;
            }
            case "IlluminanceStatus": {
                ret = new IlluminanceStatusView();
                break;
            }
            case "Arrows": {
                ret = new ArrowsView();
                break;
            }
            case "ButtonReturn": {
                ret = new ButtonReturnView();
                break;
            }
            case "ButtonExit": {
                ret = new ButtonExitView();
                break;
            }
            case "MediaButtons": {
                ret = new MediaButtonsView();
                break;
            }
            case "Volume": {
                ret = new VolumeView();
                break;
            }
            case "Channels": {
                ret = new ChannelsView();
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
    constructor() {
        super();
        this._sendCommands = false;
        this.statusList = [];
        this._showInMainView = false;
    }
    getStatusList(deviceInfo) {
        return this.statusList;
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    get sendCommands() {
        return this._sendCommands;
    }
    get showInMainView() {
        return this._showInMainView;
    }
}
class OnOffView extends Trait {
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
            this.dispatchEvent(new CustomEvent('send-command', { detail: [this.getAttribute("cmd"), null] }));
        });
    }
    static get observedAttributes() {
        return OnOffView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        newValue = newValue.toLowerCase();
        if (oldValue != newValue && name === "power") {
            this.button.setAttribute('color', newValue);
            if (newValue === "on") {
                this.button.name = "off";
                this.setAttribute("cmd", "off");
            }
            else {
                this.button.name = "on";
                this.setAttribute("cmd", "on");
            }
        }
    }
}
OnOffView.attr = ['power'];
class MultiSwitchView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = MultiSwitchView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
        }`);
        this.buttonLeft = new ButtonSmall("on");
        this.buttonLeft.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: [this.getAttribute("cmd-left"), 'left'] }));
        });
        this.buttonRight = new ButtonSmall("on");
        this.buttonRight.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: [this.getAttribute("cmd-right"), 'right'] }));
        });
        this.root.appendChild(this.buttonLeft);
        this.root.appendChild(this.buttonRight);
    }
    static get observedAttributes() {
        return MultiSwitchView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        newValue = newValue.toLowerCase();
        if (oldValue != newValue) {
            let button;
            let valueToSet;
            if (newValue === "on") {
                valueToSet = "off";
            }
            else {
                valueToSet = "on";
            }
            if (name === 'left') {
                button = this.buttonLeft;
            }
            else if (name === 'right') {
                button = this.buttonRight;
            }
            else {
                return;
            }
            button.setAttribute('color', newValue);
            button.name = valueToSet;
            this.setAttribute(`cmd-${name}`, valueToSet);
        }
    }
}
MultiSwitchView.attr = ['left', 'right'];
class RgbView extends Trait {
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
            grid-area: color;
        }`);
        this.label = document.createElement("label");
        this.label.innerText = "Color";
        this.inputColor = document.createElement("input");
        this.inputColor.type = "color";
        this.root.appendChild(this.label);
        this.root.appendChild(this.inputColor);
        this.inputColor.addEventListener("change", (el) => {
            this.setAttribute('rgb', this.hexToRgbInt(this.inputColor.value));
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['set_color', Number(this.getAttribute("rgb"))] }));
        });
    }
    static get observedAttributes() {
        return ['rgb'];
    }
    rgbIntToHex(rgb) {
        let rgbInt = parseInt(rgb);
        let b = rgbInt & 255;
        let g = (rgbInt >> 8) & 255;
        let r = (rgbInt >> 16) & 255;
        console.log(r, g, b, `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    hexToRgbInt(hexColor) {
        return parseInt(hexColor.substr(1), 16).toString();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue && name === "rgb") {
            this.inputColor.value = this.rgbIntToHex(newValue);
        }
    }
}
class DimmerView extends Trait {
    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['bright'];
        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            grid-area: bright;
            justify-content: center;
        }`);
        this.inputBright = new RangeSet("Bright", "linear-gradient(to right, black, white)");
        this.root.appendChild(this.inputBright);
        this.inputBright.addEventListener('change', () => {
            console.log('event re-emited');
            this.setAttribute('bright', this.inputBright.value);
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['set_bright', Number(this.inputBright.value)] }));
        });
    }
    static get observedAttributes() {
        return ['bright'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue && name === "bright") {
            let intValue = parseInt(newValue);
            if (intValue <= 100 && intValue >= 1) {
                this.inputBright.value = newValue;
            }
            else {
                this.setAttribute('bright', oldValue);
            }
        }
    }
}
class ColorTemperatureView extends Trait {
    constructor() {
        super();
        this._sendCommands = true;
        this.statusList = ['ct_pc'];
        this.sheet.insertRule(`:host {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            grid-area: colorTemp;
            justify-content: center;
        }`);
        this.inputCT = new RangeSet("Color Temperature", "linear-gradient(to right, orange, yellow, white)");
        this.root.appendChild(this.inputCT);
        this.inputCT.addEventListener('change', () => {
            console.log('event re-emited');
            this.setAttribute('ct_pc', this.inputCT.value);
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['set_ct_pc', Number(this.inputCT.value)] }));
        });
    }
    static get observedAttributes() {
        return ['ct_pc'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue && name === "ct_pc") {
            console.log(`ct_pc set att ${oldValue} => ${newValue} for ${name}`);
            let intValue = parseInt(newValue);
            if (intValue <= 100 && intValue >= 1) {
                this.inputCT.value = newValue;
            }
            else {
                this.setAttribute('ct_pc', oldValue || "50");
            }
        }
    }
}
class TemperatureStatusView extends Trait {
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
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "temperature") {
            this.temp.innerText = `${newValue} C`;
        }
    }
}
TemperatureStatusView.attr = ['temperature'];
class PressureStatusView extends Trait {
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
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "pressure") {
            this.temp.innerText = `${newValue} KPa`;
        }
    }
}
PressureStatusView.attr = ['pressure'];
class HumidityStatusView extends Trait {
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
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "humidity") {
            this.humidity.innerText = `${newValue} %`;
        }
    }
}
HumidityStatusView.attr = ['humidity'];
class OpenCloseView extends Trait {
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
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "status") {
            this.status.innerText = newValue;
        }
    }
}
OpenCloseView.attr = ['status'];
class MotionStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = MotionStatusView.attr;
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
        this.label.innerText = "Occupancy:";
        this.occupancy = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.occupancy);
    }
    static get observedAttributes() {
        return MotionStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "occupancy") {
            this.occupancy.innerText = newValue;
        }
    }
}
MotionStatusView.attr = ['occupancy'];
class IlluminanceStatusView extends Trait {
    constructor() {
        super();
        this._showInMainView = true;
        this.statusList = IlluminanceStatusView.attr;
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
        this.label.innerText = "illuminance:";
        this.illuminance = document.createElement("span");
        this.root.appendChild(this.label);
        this.root.appendChild(this.illuminance);
    }
    static get observedAttributes() {
        return IlluminanceStatusView.attr;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue != newValue && name === "illuminance") {
            this.illuminance.innerText = `${newValue} LUX`;
        }
    }
}
IlluminanceStatusView.attr = ['illuminance'];
class ArrowsView extends Trait {
    constructor() {
        super();
        this.buttons = ['up', 'left', 'ok', 'right', 'down'];
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
            let btn = new Button(btnName);
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
ArrowsView.attr = [];
class ButtonReturnView extends Trait {
    constructor() {
        super();
        this.statusList = ButtonReturnView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            grid-area: return;
            justify-content: center;
            
        }`);
        let btn = new Button("ret");
        btn.addEventListener("click", (el) => {
            this.dispatchEvent(new CustomEvent('send-command', { detail: ['ret', null] }));
        });
        btn.setAttribute("color", "ret");
        this.root.appendChild(btn);
    }
    static get observedAttributes() {
        return ButtonReturnView.attr;
    }
}
ButtonReturnView.attr = [];
class ButtonExitView extends Trait {
    constructor() {
        super();
        this.statusList = ButtonExitView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
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
class MediaButtonsView extends Trait {
    constructor() {
        super();
        this.buttons = { ">": 'play', "||": 'pause', "[ ]": 'stop', ">>": 'rewind', "<<": 'forward' };
        this.statusList = MediaButtonsView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: mediaBtn;
            grid-template-areas: "play pause forward stop rewind";
        }`);
        Object.keys(this.buttons).forEach((btnName) => {
            let btn = new Button(btnName);
            btn.addEventListener("click", (el) => {
                this.dispatchEvent(new CustomEvent('send-command', { detail: [this.buttons[btnName], null] }));
            });
            btn.style.gridArea = this.buttons[btnName];
            btn.setAttribute("color", this.buttons[btnName]);
            this.root.appendChild(btn);
        });
    }
    static get observedAttributes() {
        return MediaButtonsView.attr;
    }
}
MediaButtonsView.attr = [];
class VolumeView extends Trait {
    constructor() {
        super();
        this.buttons = { 'vol+': 'volume_up', 'mute': 'mute', 'vol-': 'volume_down' };
        this.statusList = VolumeView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: volume;
            grid-template-areas: "volume_up mute volume_down";
        }`);
        Object.keys(this.buttons).forEach((btnName) => {
            let btn = new Button(btnName);
            btn.addEventListener("click", (el) => {
                this.dispatchEvent(new CustomEvent('send-command', { detail: [this.buttons[btnName], null] }));
            });
            btn.style.gridArea = this.buttons[btnName];
            btn.setAttribute("color", this.buttons[btnName]);
            this.root.appendChild(btn);
        });
    }
    static get observedAttributes() {
        return VolumeView.attr;
    }
}
VolumeView.attr = [];
class ChannelsView extends Trait {
    constructor() {
        super();
        this.buttons = { 'ch+': 'channel_up', 'ch-': 'channel_down' };
        this.statusList = ChannelsView.attr;
        this._sendCommands = true;
        this.sheet.insertRule(`:host {
            display: grid;
            gap: 0.5rem;
            grid-auto-flow: column;
            justify-content: center;
            grid-area: channel;
            grid-template-areas: "channel_up channel_down";
        }`);
        Object.keys(this.buttons).forEach((btnName) => {
            let btn = new Button(btnName);
            btn.addEventListener("click", (el) => {
                this.dispatchEvent(new CustomEvent('send-command', { detail: [this.buttons[btnName], null] }));
            });
            btn.style.gridArea = this.buttons[btnName];
            btn.setAttribute("color", this.buttons[btnName]);
            this.root.appendChild(btn);
        });
    }
    static get observedAttributes() {
        return ChannelsView.attr;
    }
}
ChannelsView.attr = [];
window.customElements.define('onoff-view', OnOffView);
window.customElements.define('doubleswitch-view', MultiSwitchView);
window.customElements.define('rgb-view', RgbView);
window.customElements.define('dimmer-view', DimmerView);
window.customElements.define('ct-view', ColorTemperatureView);
window.customElements.define('temp-view', TemperatureStatusView);
window.customElements.define('pressure-view', PressureStatusView);
window.customElements.define('humidity-view', HumidityStatusView);
window.customElements.define('openclose-view', OpenCloseView);
window.customElements.define('occupancy-view', MotionStatusView);
window.customElements.define('illuminance-view', IlluminanceStatusView);
window.customElements.define('arrow-view', ArrowsView);
window.customElements.define('return-view', ButtonReturnView);
window.customElements.define('exit-view', ButtonExitView);
window.customElements.define('media-view', MediaButtonsView);
window.customElements.define('volume-view', VolumeView);
window.customElements.define('channels-view', ChannelsView);
