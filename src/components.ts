export { BaseComponent, Button, ButtonSmall };

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
    private buttonName;
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
        // this.buttonElement.innerText = name;
        this.buttonName
        this.buttonElement.appendChild(this.buttonName);
        this.root.appendChild(this.buttonElement);
    }

    static get observedAttributes() {
        return ['color'];
    }

    public attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        console.log(`${name}'s value has been changed from ${oldValue} to ${newValue}`);
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


window.customElements.define('button-normal', Button);
window.customElements.define('button-small', ButtonSmall);

