import { Device } from "./Devices.js";
import { HomeModel } from "./HomeModel.js";
import { HomeView } from "./HomeView.js";
class HomeApp {
    constructor() {
        this.ready = false;
        this.model = new HomeModel();
        this.view = new HomeView();
        this.evSource = new EventSource(`/events`);
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
window.onload = async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then((reg) => {
            console.log('ServiceWorker: ', reg.scope);
        }, (err) => {
            console.log('ServiceWorker Error', err);
        });
    }
    window.customElements.define('home-view', HomeView);
    let app = new HomeApp();
    await app.run();
};