export class DeviceModel {
    constructor(deviceInfo) {
        this.statuses = {};
        this.info = deviceInfo;
        this.langCodes = new LanguagesCodes();
    }
    get sid() {
        return this.info["sid"] || "";
    }
    get name() {
        return this.getTranslation("name");
    }
    get place() {
        return this.getTranslation("place");
    }
    get traitsNames() {
        return this.info["traits"] || [];
    }
    getTranslation(key) {
        let ret = "";
        if (this.info[key] != undefined) {
            ret = this.info[key][this.langCodes.get(navigator.language)];
        }
        return ret;
    }
    registerTraitStatus(trait) {
        for (let statusName of trait.getStatusList(this.info)) {
            this.statuses[statusName] = trait;
        }
    }
    async update(key, value) {
        if (this.statuses[key] != undefined) {
            await this.statuses[key].setAttribute(key, value);
        }
    }
}
export class LanguagesCodes {
    constructor() {
        this.codes = {
            "pl-PL": "pl",
            "pl": "pl",
            "en": "en",
            "en-US": "en"
        };
    }
    get(code) {
        if (this.codes[code] != undefined) {
            return this.codes[code];
        }
        else {
            return "en";
        }
    }
}
