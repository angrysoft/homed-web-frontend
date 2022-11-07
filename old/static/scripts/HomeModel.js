import { LanguagesCodes } from "./DevicesModel.js";
export class HomeModel {
    constructor() {
        this.places = new Set();
        this.data = [];
        this.devices = {};
        this.url = `${document.location.origin}/devices/all`;
    }
    async getData() {
        const response = await fetch(this.url);
        if (response.ok) {
            try {
                this.data = await response.json();
            }
            catch (e) {
                console.log(e);
            }
        }
        this.data.forEach((devInfo) => {
            if (typeof (devInfo["place"]) === "object") {
                this.places.add(devInfo["place"]);
            }
        });
    }
    getDevicesInfo() {
        return this.data;
    }
    getPlacesList() {
        let langCodes = new LanguagesCodes();
        let ret = new Set();
        this.places.forEach((place) => {
            if (place[langCodes.get(navigator.language)] != undefined) {
                ret.add(place[langCodes.get(navigator.language)]);
            }
        });
        return ret;
    }
    addDevice(dev) {
        this.devices[dev.sid] = dev;
    }
}
