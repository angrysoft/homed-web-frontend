export { Device };
import { DeviceModel } from "./DevicesModel.js";
import { DeviceView } from "./DevicesView.js";
import { TraitsFactory } from "./Traits.js";


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
                let event:object = {
                    'event': `execute.${this.model.sid}.${cmd.detail[0]}.${cmd.detail[1]}`,
                    'args' : cmd.detail 
                };
              
                fetch(`${document.location.pathname}/devices/send`, { method: 'POST', body: JSON.stringify(event) });
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


