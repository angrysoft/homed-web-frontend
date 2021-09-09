import { Device} from "./devices.js";
import { LanguagesCodes } from "./devicesModel.js";
import { BaseComponent } from "./components.js";
import { Place } from "./placeView.js";

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
        
        document.addEventListener('change-place', (e)=>{
            this.setPlaceFilter(e["detail"]);
        });
    }

    private setPlaceFilter(name:string) {
        console.log(`change to ${name}`);
        this.devices.childNodes.forEach((el) =>  {
        console.log(el);
        //   if (el.indexOf(filter) < 0 ) {
  
        });
    }
    
    public addDevice(devView:HTMLElement) {
        this.devices.appendChild(devView);
    }
    
    public delDevice(devView:HTMLElement) {
        this.devices.removeChild(devView);
    }

    public addPlaces(places:Set<string>) {
        places.forEach(place=> {
            this.header.appendChild(new Place(place));
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
            if (typeof(devInfo["place"]) === "object") {
                this.places.add(devInfo["place"]);
            }
        });
    }
    
    public getDevicesInfo() {
        return this.data;
    }

    public getHomeId():string {
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



window.onload = async () => {
    window.customElements.define('home-view', HomeView);
    let app = new HomeApp();
    await app.run();

};
