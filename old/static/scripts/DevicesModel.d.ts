import { Trait } from "./Traits/Trait";
export declare class DeviceModel {
    info: Object;
    private statuses;
    private langCodes;
    constructor(deviceInfo: Object);
    get sid(): string;
    get name(): string;
    get place(): string;
    get traitsNames(): string[];
    private getTranslation;
    registerTraitStatus(trait: Trait): void;
    update(key: string, value: any): Promise<void>;
}
export declare class LanguagesCodes {
    private codes;
    constructor();
    get(code: string): string;
}
