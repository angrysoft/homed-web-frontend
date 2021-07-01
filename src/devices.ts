export { Device };
import { BaseComponent, ModalBox } from "./components.js";
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
                this.model.registerTraitStatus(traitView);
                this.commandHandler(traitView);
            }
        });
    }
    
    public commandHandler(trait) {
        if (trait.sendCommands) {
            trait.addEventListener("send-command", (cmd:any) => {
                let command:string = `"cmd":"execute", "sid": "${this.model.sid}", "data":"${cmd.detail}"`;
                console.log(cmd.detail);
                fetch(`${document.location.pathname}/devices/send`, { method: 'POST', body: command});
            });
        }
    }


    public async updateStatus(status:Object) {
        for (let key in status) {
            if (key === '_id' || key === '_rev') {
                continue;
            }
            await this.model.update(key, status[key]);
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
            if (target.tagName === "SECTION") {
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


class DeviceModel {
    public info: Object;
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
        for (let statusName of trait.getStatusList(this.info)) {
            this.statuses[statusName] = trait;
        }
    }

    public async update(key:string, value:any) {
        console.log(`update from device ${this.sid}: ${key}, ${value}`);
        if (this.statuses[key] != undefined) {
            await this.statuses[key].setAttribute(key, value);
        }
    }
    
}



window.customElements.define('device-view', DeviceView);
