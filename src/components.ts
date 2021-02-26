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
        // this.buttonElement.innerText = name;
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


class ModalBox extends BaseComponent {
    private modal:HTMLElement;
    private content:HTMLElement;
    private header:HTMLElement;
    private close:HTMLElement;
    private body:HTMLElement;
    private headerTitle: Text;
    
    constructor() {
        super();

        this.sheet.insertRule(`:host {
            display:none;
            justify-content: center;
            position: fixed;
            z-index: 100;
            left: 0;
            top :0;
            width:100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }`);

        this.sheet.insertRule(`@keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale3d(.3, .3, .3);
            }
          
            50% {
              opacity: 1;
            }
          }
        }`);

        this.sheet.insertRule(`section {
            display: grid;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr;
            align-content: center;
            justify-content: center;
            position : relative;
            z-index: 1;
            padding: 0.5rem;
            background: black;
            color:white;
            animation-duration: .3s;
            animation-name: zoomIn;
        }`);

        this.sheet.insertRule(`header {
            display: gird;
            gap: 0.5rem;
            grid-template-columns: auto 1fr;
            padding 0.5rem;
        }`);

        this.sheet.insertRule(`article {
            display: gird;
            gap: 0.5rem;
            padding 0.5rem;

        }`);

        this.modal = document.createElement("div");
        this.content = document.createElement("section");
        this.header = document.createElement("header");
        this.close = document.createElement("span");
        this.headerTitle = document.createTextNode("title");
        this.header.appendChild(this.close);
        this.header.appendChild(this.headerTitle);
        this.body = document.createElement("article");
        this.content.appendChild(this.header);
        this.content.appendChild(this.body);
        this.modal.appendChild(this.content);
        
    }
    
    public show() {
        let rule:CSSStyleRule = this.sheet.rules[0] as CSSStyleRule;
        rule.style.display = "block";
    }
  
    public hide() {
        let rule:CSSStyleRule = this.sheet.rules[0] as CSSStyleRule;
        rule.style.display = "none";
    }

    set title(value:string) {
        this.headerTitle.data = value;
    }

    get title() {
        return this.headerTitle.data;
    }
  }

  class IconView extends BaseComponent {

  }

  class ColorPicker extends BaseComponent{ }

  class RangeSet extends BaseComponent {
      constructor() {
          super();
      }
  }


window.customElements.define('button-normal', Button);
window.customElements.define('button-small', ButtonSmall);
window.customElements.define('modal-box', ModalBox);
window.customElements.define('icon-view', IconView);

