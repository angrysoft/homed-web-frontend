export {
    BaseComponent,
    Button,
    ButtonSmall,
    ModalBox,
    RangeSet
};

class BaseComponent extends HTMLElement {
    protected sheet:CSSStyleSheet;
    protected html:string = '';
    protected root;

    constructor() {
        super();
        this.sheet = new CSSStyleSheet();
        this.root = this.attachShadow({ mode: 'open'});
    }

    public adoptedCallback() {
        console.log('I am adopted!');
    }

    public connectedCallback() {
        if (this.root.adoptedStyleSheets.length === 0) {
            this.root.adoptedStyleSheets = [ this.sheet ];
        }
    }

    public render() {
        this.root.innerHTML = this.html;
    }
}

class Button extends BaseComponent {
    private buttonName: Text;
    private buttonElement: HTMLElement;

    constructor(name:string) {
        super();
        this.sheet.insertRule(`button {
            display: inline-block;
            transition:.2s ease-out;
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 36px;
            min-width: 64px;
            margin: 0;
            padding: 0 16px;
            border: none;
            border-radius: 2px;
            box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
            outline: none;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            text-decoration: none;
            text-align: center;
            letter-spacing: 0;
            vertical-align: middle;
            line-height: 36px;
            color: #000;
            cursor: pointer;
            background: var(--button-color);
        }`, 0);

        this.sheet.insertRule(`button:active {box-shadow:none;}`, 1);

        this.buttonElement = document.createElement("button");
        this.buttonName = document.createTextNode(name);
        this.buttonElement.appendChild(this.buttonName);
        this.root.appendChild(this.buttonElement);
    }

    static get observedAttributes() {
        return ['color'];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        switch(name) {
            case "color":
                this.setColor(newValue);
                break;

        }
    }

    private setColor(value:string) {
        let rule:CSSStyleRule = this.sheet.rules[0] as CSSStyleRule;
        rule.style.background = `var(--button-${value})`;
    }

    set name(value:string) {
        this.buttonName.data = value;
    }

    get name() {
        return this.buttonName.data;
    }
    
}

class ButtonSmall extends Button {
    constructor(name:string) {
        super(name);
        let rule:CSSStyleRule = this.sheet.rules[0] as CSSStyleRule;
        rule.style.fontSize = "12px";
        rule.style.height = "24px";
        rule.style.width = "100%";
        rule.style.minWidth = "48px";
        rule.style.padding = "0 8px";
        rule.style.lineHeight = "24px";
    }
}


class ModalBox extends BaseComponent {
    // private modal:HTMLElement;
    private content:HTMLElement;
    private header:HTMLElement;
    private close:HTMLElement;
    private body:HTMLElement;
    private headerTitle: HTMLElement;
    
    constructor() {
        super();

        this.sheet.insertRule(`:host {
            display:none;
            grid-auto-columns: 1fr;
            position: fixed;
            z-index: 100;
            left: 0;
            top :0;
            width:100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(35,35,35,0.9);
        }`);

        // this.sheet.insertRule(`@keyframes zoomIn {
        //     from {
        //       opacity: 0;
        //       transform: scale3d(.3, .3, .3);
        //     }
          
        //     50% {
        //       opacity: 1;
        //     }
        //   }
        // }`);

        this.sheet.insertRule(`section {
            display: grid;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr;
            align-content: center;
            
            position : relative;
            z-index: 1;
            padding: 0.5rem;
            background: black;
            color:white;
            animation-duration: .3s;
            animation-name: zoomIn;
        }`);

        this.sheet.insertRule(`header {
            display: grid;
            gap: 1rem;
            grid-template-columns: auto 1fr;
            padding 0.5rem;
        }`);

        this.sheet.insertRule(`article {
            display: grid;
            gap: 1rem;
            padding 0.5rem;
            grid-template-areas: 
            "color color color color color color"
            "colorTemp colorTemp colorTemp colorTemp colorTemp colorTemp"
            "bright bright bright bright bright bright"
            ". . arrows arrows . ."
            ". . return exit . ."
            "mediaBtn mediaBtn mediaBtn mediaBtn mediaBtn mediaBtn"
            "volume volume volume volume volume volume"
            "channel channel channel channel channel channel"
        }`);

        this.content = document.createElement("section");
        this.header = document.createElement("header");

        this.close = document.createElement("div");
        this.close.innerText = "<-";
        this.close.style.cursor = 'pointer';
        this.close.addEventListener('click', () => this.hide())
        
        this.headerTitle = document.createElement("div");
        this.headerTitle.innerText = "Device Options"
        this.header.appendChild(this.close);
        this.header.appendChild(this.headerTitle);
        this.body = document.createElement("article");
        this.content.appendChild(this.header);
        this.content.appendChild(this.body);
        this.root.appendChild(this.content);
    }
    
    public show() {
        let rule:CSSStyleRule = this.sheet.rules[3] as CSSStyleRule;
        rule.style.display = "grid";
    }
  
    public hide() {
        let rule:CSSStyleRule = this.sheet.rules[3] as CSSStyleRule;
        rule.style.display = "none";
    }

    set title(value:string) {
        this.headerTitle.innerText = value;
    }

    get title() {
        return this.headerTitle.innerText;
    }

    public addBodyElement(el: BaseComponent) {
        this.body.appendChild(el);
    }
  }

class IconView extends BaseComponent {

}

class RangeSet extends BaseComponent {
    private input: HTMLInputElement;
    private label: HTMLLabelElement;
    private sliderColor: string;

    constructor(name:string = "Range", sliderColor:string = "var(--widget-color)") {
        super();
        this.sliderColor = sliderColor;
        this.sheet.insertRule(`input[type=range] {
        -webkit-appearance: none;
        margin: 18px 0;
        width: 100%;
        }`);

        this.sheet.insertRule(`input[type=range]:focus {
        outline: none;
        }`);

        try {
            this.sheet.insertRule(`input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
                background: ${this.sliderColor};
                border-radius: 1.3px;
                border: 0.2px solid #010101;
            }`);
            this.sheet.insertRule(`input[type=range]::-webkit-slider-thumb {
                box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
                border: 1px solid #000000;
                height: 2rem;
                width: 2rem;
                border-radius: 3px;
                background: #ffffff;
                cursor: pointer;
                -webkit-appearance: none;
                margin-top: -14px;
            }`);

            this.sheet.insertRule(`input[type=range]:focus::-webkit-slider-runnable-track {
                background: ${this.sliderColor};
            }`);
        } catch (e) {
            // console.log(e);
        }

    try {
        this.sheet.insertRule(`input[type=range]::-moz-range-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            background: ${this.sliderColor};
            border-radius: 1.3px;
            border: 0.2px solid #010101;
        }`);

        this.sheet.insertRule(`input[type=range]::-moz-range-thumb {
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            border: 1px solid #000000;
            height: 2rem;
            width: 2rem;
            border-radius: 3px;
            background: #ffffff;
            cursor: pointer;
        }`);

        
    } catch (e) {
        // console.log(e);
    }
    
    this.sheet.insertRule(`label {
        color: white;
        text-align: center;
    }`);

    this.sheet.insertRule(`:host {
        display:grid;
        gap: 1rem;
        grid-template-columns: 1fr;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }`);

        this.label = document.createElement("label");
        this.label.innerText = name;
        this.input = document.createElement("input");
        this.input.type = "range";
        this.input.step = "1";
        this.input.min = "1";
        this.input.max = "100";
        this.root.appendChild(this.label);
        this.root.appendChild(this.input);
        this.input.addEventListener('change', () => {
            this.dispatchEvent(new Event('change'));
        });
    }

    public set value(value:string) {
        this.input.value = value;
    }

    public get value(): string {
        return this.input.value;
    }

}


window.customElements.define('button-normal', Button);
window.customElements.define('button-small', ButtonSmall);
window.customElements.define('modal-box', ModalBox);
window.customElements.define('icon-view', IconView);
window.customElements.define('input-range', RangeSet);

