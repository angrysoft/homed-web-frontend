export { PlaceTab };
import { BaseComponent } from "./base.js";
declare class PlaceTab extends BaseComponent {
    private devices;
    constructor(id: string);
    addDeviceFromInfo(devInfo: Object): void;
    show(): void;
    hide(): void;
}
