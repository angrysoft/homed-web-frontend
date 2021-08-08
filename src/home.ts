import { Device } from "./devices.js";
import { BaseComponent } from "./components.js";

class HomeApp {
    private model:HomeModel;
    private view:HomeView;
    private ready:boolean = false;
    private evSource: EventSource;
    
    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();
        this.evSource = new EventSource(`/${this.model.getHomeId()}/events`);
        this.evSource.onmessage = async (event) => {
            if (event.data.startsWith('{')) {
                await this.updateDeviceStatus(JSON.parse(event.data));
            }
        }
    }
    
    public async run() {
        await this.model.getData();
        this.view.addPlaces(this.model.getPlacesList);
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
    
class HomeView extends BaseComponent {
    private main:HTMLElement;
    private header:HTMLElement;
    private devices:HTMLElement;
    private footer:HTMLElement;
    
    constructor() {
        super();
        this.main = document.createElement("main");
        this.header = document.createElement("header");
        this.devices = document.createElement("section");
        this.footer = document.createElement("footer");
        // this.header.innerText = "Header";
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
        }`);
        // this.sheet.insertRule(`section {
        //     display: flex;
        //     flex-flow: row wrap;
        //     gap: 1rem;
        //     overflow-y: auto;
        //     padding: 1rem;
        // }`);
        
        this.sheet.insertRule(`header {
            display: flex;
            padding: 1rem;
            overflow-x: auto;
            gap: 0.1rem;
        }`);
        
        this.sheet.insertRule(`footer {
            display: flex;
            justify-content: space-between; 
            padding: 1rem;
            background: black;
        }`);
        
    }
    
    public addDevice(devView:HTMLElement) {
        this.devices.appendChild(devView);
    }
    
    public delDevice(devView:HTMLElement) {
        this.devices.removeChild(devView);
    }

    public addPlaces(places:string[]) {
        places.forEach(place=> {
            let div = document.createElement('div');
            div.innerText = place;
            this.header.appendChild(div);
        });
    }
    
    public render() {
        this.root.appendChild(this.main);
        document.body.appendChild(this);
    }
}

class HomeModel {
    private places:Set<string> = new Set();
    private homeid:string;
    private url:string;
    private data:Object[] = [];
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
            } catch(e) {
                console.log(e);
            }
        }
        this.data.forEach( (devInfo) => {
            this.places.add(devInfo["place"]);
        });
    }
    
    public getDevicesInfo() {
        return this.data;
    }

    public getHomeId():string {
        return this.homeid;
    }
    
    public getPlacesList(): string[] {
        let ret:string[] = []
        this.places.forEach((place) => {
            ret.push(place);
        });
        return ret;
    }

    public addDevice(dev: Device) {
        this.devices[dev.sid] = dev;
    }
}


window.onload = async () => {
    window.customElements.define('home-view', HomeView);
    let app = new HomeApp();
    await app.run();

};
