import { Device } from "../Controller/Devices.js";
export declare class HomeModel {
    private places;
    private url;
    private data;
    devices: Object;
    constructor();
    getData(): Promise<void>;
    getDevicesInfo(): Object[];
    getPlacesList(): Set<string>;
    addDevice(dev: Device): void;
}
