import { BaseComponent, ModalBox } from "./components.js";
import { Trait } from "./traits.js";

export class DeviceView extends BaseComponent {
    private header:HTMLElement;
    private traits:HTMLElement;
    private traitsView: ModalBox;
    
    constructor(id:string, name:string, place:string) {
        super();
        this.id = id;
        this.name = name;
        this.place = place;

        this.header = document.createElement("header");
        this.header.innerText = this.name;
        this.traits = document.createElement("section");
        this.traitsView = new ModalBox();

        this.sheet.insertRule(`:host {
            display: grid;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr;
            align-content: center;
            padding: 0.5rem;
            border-radius: 0.2rem;
            background: black;
        }`);
        
        this.sheet.insertRule(`header {
            display:grid;
            gap: 0.1rem;
            justify-content: center;
        }`);
        
        this.sheet.insertRule(`section {
            display:grid;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem;
        }`);

        this.traits.addEventListener("click", (el) => {
            let target = el.target as HTMLElement;
            if (target.tagName === "HEADER") {
                this.traitsView.show();
            }
        });

    }

    public showTraitsView() {
        this.traitsView.show();
    }

    public hideTraitsView() {
        this.traitsView.hide();
    }

    public render() {
        this.root.appendChild(this.header);
        this.root.appendChild(this.traits);
        this.root.appendChild(this.traitsView);
    }

    public addTraitView(trait:Trait) {
        if (trait.showInMainView) {
            this.traits.appendChild(trait);
        } else {
            this.traitsView.addBodyElement(trait)
        }
    }
    
    get name():string {
        return this.getAttribute('name') || '';
    }
    
    set name(value:string) {
        this.setAttribute('name', value);
    }

    get place():string {
        return this.getAttribute('place') || '';
    }
    
    set place(value:string) {
        this.setAttribute('place', value);
    }

}

window.customElements.define('device-view', DeviceView);
