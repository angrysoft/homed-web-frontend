import { BaseComponent, ModalBox } from "./components.js";
export class DeviceView extends BaseComponent {
    constructor(id, name, place) {
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
        this.header.addEventListener("click", (el) => {
            let target = el.target;
            if (target.tagName === "HEADER") {
                this.traitsView.show();
            }
        });
    }
    showTraitsView() {
        this.traitsView.show();
    }
    hideTraitsView() {
        this.traitsView.hide();
    }
    render() {
        this.root.appendChild(this.header);
        this.root.appendChild(this.traits);
        this.root.appendChild(this.traitsView);
    }
    addTraitView(trait) {
        if (trait.showInMainView) {
            this.traits.appendChild(trait);
        }
        else {
            this.traitsView.addBodyElement(trait);
        }
    }
    get name() {
        return this.getAttribute('name') || '';
    }
    set name(value) {
        this.setAttribute('name', value);
    }
    get place() {
        return this.getAttribute('place') || '';
    }
    set place(value) {
        this.setAttribute('place', value);
    }
}
window.customElements.define('device-view', DeviceView);
