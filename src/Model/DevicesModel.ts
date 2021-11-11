import { Trait } from "../Traits/Trait.js";

export class DeviceModel {
    public info: Object;
    private statuses: Object = {};
    private langCodes: LanguagesCodes;

    constructor(deviceInfo:Object) {
        this.info = deviceInfo;
        this.langCodes = new LanguagesCodes();
    }

    get sid():string {
        return this.info["sid"] || "";
    }

    get name():string {
        return this.getTranslation("name");
    }

    get place():string {
        return this.getTranslation("place");
    }

    get traitsNames(): string[] {
        return this.info["traits"] || [];
    }

    private getTranslation(key:string):string {
        let ret = "";
        if ( this.info[key] != undefined) {
            ret  = this.info[key][this.langCodes.get(navigator.language)];
        }
        return ret;
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

export class LanguagesCodes {
    private codes: Object 
    constructor() {
        this.codes = {
            "pl-PL": "pl",
            "pl": "pl",
            "en": "en",
            "en-US": "en"
        }
    }

    public get(code:string):string {
        if (this.codes[code] != undefined) {
            return this.codes[code];
        } else {
            return "en";
        }

    }
}