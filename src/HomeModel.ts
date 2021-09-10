import { Device } from "./Devices.js";
import { LanguagesCodes } from "./DevicesModel.js";

export class HomeModel {
    private places: Set<string> = new Set();
    private homeid: string;
    private url: string;
    private data: Object[] = [];
    public devices: Object = {};

    constructor() {
        this.homeid = document.location.pathname;
        this.homeid = this.homeid.substr(1);
        this.url = `${document.location.pathname}/devices/all`;
    }

    public async getData() {
        const response = await fetch(this.url);
        if (response.ok) {
            try {
                this.data = await response.json();
            } catch (e) {
                console.log(e);
            }
        }

        this.data.forEach((devInfo) => {
            if (typeof (devInfo["place"]) === "object") {
                this.places.add(devInfo["place"]);
            }
        });
    }

    public getDevicesInfo() {
        return this.data;
    }

    public getHomeId(): string {
        return this.homeid;
    }

    public getPlacesList(): Set<string> {
        let langCodes: LanguagesCodes = new LanguagesCodes();
        let ret: Set<string> = new Set();
        this.places.forEach((place) => {

            if (place[langCodes.get(navigator.language)] != undefined) {
                ret.add(place[langCodes.get(navigator.language)]);
            }
        });
        return ret;
    }

    public addDevice(dev: Device) {
        this.devices[dev.sid] = dev;
    }
}
