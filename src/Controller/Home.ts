import { Device} from "./Devices.js";
import { HomeModel } from "../Model/HomeModel.js";
import { HomeView } from "../View/HomeView.js";

class HomeApp {
    private model:HomeModel;
    private view:HomeView;
    private ready:boolean = false;
    private evSource: EventSource;
    
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();
        this.evSource = new EventSource(`/events`);
        this.evSource.onmessage = async (event) => {
          console.log(event)
            if (event.data.startsWith('{')) {
                await this.updateDeviceStatus(JSON.parse(event.data));
            }
        }
    }
    
    public async run() {
        await this.model.getData();
        this.view.addPlaces(this.model.getPlacesList());
        this.model.getDevicesInfo().forEach(deviceInfo => {
            let dev = new Device(deviceInfo);
            this.view.addDevice(dev.getView());
            this.model.addDevice(dev);
            
        });
        
        this.view.render();
    }

    public async updateDeviceStatus(status:object) {
        if (status["sid"] in this.model.devices && "data" in status) {
            await this.model.devices[status["sid"]].updateStatus(status["data"]);
        }

    }
}
    
window.onload = async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('/sw.js')
        .then( (reg) => {
            console.log('ServiceWorker: ', reg.scope);
        }, (err)=> {
            console.log('ServiceWorker Error', err);
        });
    }
    let app = new HomeApp();
    await app.run();
};
