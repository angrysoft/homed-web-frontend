export { Device };
import { BaseComponent } from "./components.js";
import { TraitsFactory, Trait } from "./traits.js";


class Device {
    private model: DeviceModel;
    private view: DeviceView;

    constructor(deviceInfo:Object) {
        this.model = new DeviceModel(deviceInfo);
        this.view =  new DeviceView(this.model.sid, this.model.name, this.model.place);
        this.loadTraits();
        this.updateStatus(deviceInfo);
        this.view.render();
    }

    private loadTraits() {
        this.model.traitsNames.forEach(trait => {
            let traitView = TraitsFactory.getTrait(trait);
            if (traitView != undefined) {
                this.view.addTraitView(traitView);
                this.model.registerTraitStatus(traitView)
            }
        });
    }


    public updateStatus(status:Object) {
        // {power: on}
        for (let key in status) {
            console.log(`updateStatus ${key} ,${status[key]}`);
            this.model.update(key, status[key]);
        }
    }
    
    public getView() {
        return this.view;
    }

    get sid() {
        return this.model.sid;
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
            justify-content: center;
        }`);

        this.sheet.insertRule(`section {
            display:grid;
            gap: 1rem;
            padding: 1rem;
        }`);

    }

    public render() {
        this.root.appendChild(this.header);
        this.root.appendChild(this.traits);
    }

    public addTraitView(trait:BaseComponent) {
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
    private statuses: Object = {};

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

    public registerTraitStatus(trait: Trait) {
        for (let statusName of trait.getStatusList()) {
            this.statuses[statusName] = trait;
        }
    }

    public update(key:string, value:any) {
        console.log(`update ${key}, ${value}`);
        if (this.statuses[key] != undefined) {
            this.statuses[key].setAttribute(key, value);
        }
    }
    
}



window.customElements.define('device-view', DeviceView);
