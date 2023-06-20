export { Device };
import { DeviceView } from "./DevicesView.js";
declare class Device {
    private model;
    private view;
    constructor(deviceInfo: Object);
    private loadTraits;
    commandHandler(trait: any): void;
    updateStatus(status: Object): Promise<void>;
    getView(): DeviceView;
    get sid(): string;
}
