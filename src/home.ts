import { PlaceTab } from "./placetab.js";
import { BaseComponent } from "./base.js";


class HomeApp {
    private places: PlaceTab[] = [];
    private model:HomeModel;
    private view:HomeView;

    constructor() {
        this.model = new HomeModel();
        this.view = new HomeView();
    }

    public async run() {
        await this.model.getData();
        this.model.getPlaces().forEach(placeName => {
            let tab = new PlaceTab(placeName);
            this.view.addPlaceTab(tab);
            this.model.getDevicesFromPlace(placeName).forEach(devInfo => {
                tab.addDeviceFromInfo(devInfo);
            });

            this.places.push(tab);
        });
        this.view.render();
        this.places[0].show();
        console.log(this.model.getPlaces());
    }
}

class HomeView extends BaseComponent {
    private main:HTMLElement;
    private header:HTMLElement;
    private places:HTMLElement;
    private footer:HTMLElement;

    constructor() {
        super();
        this.main = document.createElement("main");
        this.header = document.createElement("header");
        this.places = document.createElement("section");
        this.footer = document.createElement("footer");
        this.header.innerText = "Header";
        this.footer.innerText = "Footer";
        this.main.appendChild(this.header);
        this.main.appendChild(this.places);
        this.main.appendChild(this.footer);

        this.sheet.insertRule(`main {
            display: grid;
            grid-row-gap: 0.2rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr auto;
            min-height:100%;
            align-content: center;
            background: red;
        }`);

        this.sheet.insertRule(`header {
            padding: 0.5rem;
            background: green;
        }`);

        this.sheet.insertRule(`footer {
            padding: 0.5rem;
            background: blue;
        }`);

    }

    public addPlaceTab(tab:PlaceTab) {
        this.places.appendChild(tab);
    }

    public delPlaceTab(tab:PlaceTab) {
        this.places.removeChild(tab);
    }

    public render() {
        this.root.appendChild(this.main);
        document.body.appendChild(this);
    }

}

class HomeModel {
    private homeid:string;
    private url:string;
    private data:Object = {};

    constructor() {
        this.homeid = document.location.pathname;
        this.homeid = this.homeid.substr(1);
        this.url = `${document.location.href}/devices`;
    }

    public async getData() {
        const response = await fetch(this.url);
        if (response.ok) {
            this.data = await response.json();
        }
    }

    public getPlaces(): string[] {
        return Object.keys(this.data);
    }

    public getDevicesFromPlace(place:string) {
        let ret: Object[] = [];
        if (this.data[place] != undefined) {
            ret = this.data[place];
        }
        return ret;
    }
}

window.onload = async () => {
    window.customElements.define('home-view', HomeView);
    let app = new HomeApp();
    app.run()

};
