import { Trait } from "traits";

export class DeviceModel {
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
        if (this.statuses[key] != undefined) {
            await this.statuses[key].setAttribute(key, value);
        }
    }
    
}