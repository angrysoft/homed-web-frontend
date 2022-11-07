import { Device } from "./devices.js";
import { LanguagesCodes } from "./devicesModel.js";
import { BaseComponent } from "./components.js";
class HomeApp {
    constructor() {
        this.ready = false;
        this.model = new HomeModel();
        this.view = new HomeView();
        this.evSource = new EventSource(`/${this.model.getHomeId()}/events`);
        this.evSource.onmessage = async (event) => {
            if (event.data.startsWith('{')) {
                await this.updateDeviceStatus(JSON.parse(event.data));
            }
        };
    }
    async run() {
        await this.model.getData();
        this.view.addPlaces(this.model.getPlacesList());
        this.model.getDevicesInfo().forEach(deviceInfo => {
            let dev = new Device(deviceInfo);
            this.view.addDevice(dev.getView());
            this.model.addDevice(dev);
        });
        this.view.render();
    }
    async updateDeviceStatus(status) {
        if (status["sid"] in this.model.devices && "data" in status) {
            await this.model.devices[status["sid"]].updateStatus(status["data"]);
        }
    }
}
class HomeView extends BaseComponent {
    constructor() {
        super();
        this.main = document.createElement("main");
        this.header = document.createElement("header");
        this.devices = document.createElement("section");
        this.footer = document.createElement("footer");
        this.footer.innerHTML = `
        <span class=".material-icons"><a href="#">home</a></span>
        <span class=".material-icons"><a href="#">favorite</a></span>
        <span class=".material-icons"><a href="#">settings</a></span>
        `;
        this.main.appendChild(this.header);
        this.main.appendChild(this.devices);
        this.main.appendChild(this.footer);
        this.sheet.insertRule(`main {
            display: grid;
            grid-row-gap: 0.2rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr auto;
            min-height:100%;
            max-height:100%;
            align-content: center;
        }`);
        this.sheet.insertRule(`section {
            display: flex;
            gap: 0.5rem;
            overflow-y: auto;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
            border-top: 2px solid black;
            padding-top: 1rem;
        }`);
        this.sheet.insertRule(`header {
            display: flex;
            padding: 2rem 0.5rem 1rem;
            overflow-x: auto;
            gap: 1rem;
            white-space: pre;
        }`);
        this.sheet.insertRule(`footer {
            display: flex;
            justify-content: space-between; 
            padding: 1rem;
            background: black;
        }`);
    }
    addDevice(devView) {
        this.devices.appendChild(devView);
    }
    delDevice(devView) {
        this.devices.removeChild(devView);
    }
    addPlaces(places) {
        places.forEach(place => {
            let div = document.createElement('div');
            div.innerText = place;
            this.header.appendChild(div);
        });
    }
    render() {
        this.root.appendChild(this.main);
        document.body.appendChild(this);
    }
}
class HomeModel {
    constructor() {
        this.places = new Set();
        this.data = [];
        this.devices = {};
        this.homeid = document.location.pathname;
        this.homeid = this.homeid.substr(1);
        this.url = `${document.location.pathname}/devices/all`;
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
            this.places.add(devInfo["place"]);
        });
    }
    getDevicesInfo() {
        return this.data;
    }
    getHomeId() {
        return this.homeid;
    }
    getPlacesList() {
        let langCodes = new LanguagesCodes();
        let ret = new Set();
        this.places.forEach((place) => {
            console.log(place);
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
window.onload = async () => {
    window.customElements.define('home-view', HomeView);
    let app = new HomeApp();
    await app.run();
};
