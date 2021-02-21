export { Device };
import { BaseComponent } from "./base.js";


class Device {
    private model: DeviceModel;
    private view: DeviceView;
    
    constructor(deviceInfo:Object) {
        this.model = new DeviceModel(deviceInfo);
        this.view =  new DeviceView(this.model.sid, this.model.name, this.model.place);
        this.loadTraits();
        this.view.render();
    }

    private loadTraits() {
        this.model.traitsNames.forEach(trait => {
            this.view.addTraitView(TraitsFactory.getTrait(trait));
            console.log(trait);
        });
    }
    
    public getView() {
        return this.view;
    }
    
}


class DeviceView extends BaseComponent {
    private header:HTMLElement;
    private traits:HTMLElement;
    
    constructor(id:string, name:string, place:string) {
        super();
        this.id = id;
        this.name = name;
        this.place = place;

        this.header = document.createElement("header");
        this.traits = document.createElement("section");

        this.header.innerHTML = `
        <header>
            <div>${this.name}</div>
            <div></div>
            <div></div>
        </header>`

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
            grid-template-columns: 3fr 0.5fr 0.5fr;
        }`);

    }

    public render() {
        this.root.appendChild(this.header);
        this.root.appendChild(this.traits);
    }

    public addTraitView(trait:HTMLElement) {
        this.traits.appendChild(trait);
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


class DeviceModel {
    private info: Object;
    constructor(deviceInfo:Object) {
        this.info = deviceInfo;
    }

    get sid():string {
        return this.info["sid"] || "";
    }

    get name():string {
        return this.info["name"] || "";
    }

    get place():string {
        return this.info["place"] || "";
    }

    get traitsNames(): string[] {
        return this.info["traits"] || [];
    }
    
}

class TraitsFactory {
    static getTrait(traitName:string) {
        let tr = document.createElement("div");
        tr.innerText = traitName;
        return tr;
    }
    
}

window.customElements.define('device-view', DeviceView);