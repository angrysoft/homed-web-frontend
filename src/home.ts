class BaseComponent extends HTMLElement {
    protected sheet:CSSStyleSheet;
    protected html:string = '';
    protected root;

    constructor() {
        super();
        this.sheet = new CSSStyleSheet();
        this.root = this.attachShadow({ mode: 'open'});
    }

    

    public adoptedCallback() {
        console.log('I am adopted!');
    }

    public connectedCallback() {
        if (this.root.adoptedStyleSheets.length === 0) {
            this.root.adoptedStyleSheets = [ this.sheet ];
        }

        this.render();
    }

    public render() {
        this.root.innerHTML = this.html;
    }
}

class HomeApp extends BaseComponent {
    private places: PlaceTab[] = [];
    private model:HomeModel;

    constructor() {
        super();
        this.model = new HomeModel();

        this.sheet.insertRule(`div.home {
            display: grid;
            grid-row-gap: 0.2rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr auto;
            min-height:100%;
            align-content: center;
            background: red;
        }`);

        this.sheet.insertRule(`header#header {
            padding: 0.5rem;
            background: green;
        }`);

        this.sheet.insertRule(`footer#footer {
            padding: 0.5rem;
            background: blue;
        }`);

        this.html = `
        <div class="home">
            <header id="header">Header</header>
            <div id="places"></div>
            <footer id="footer">Footer</footer>
        </div>`
    }
    
    public async render() {
        await this.model.getData();
        super.render();
        this.model.getPlaces().forEach(placeName => {
            let places = this.root.querySelector('#places') as HTMLDivElement;
            let tab = new PlaceTab(placeName);
            this.model.getDevicesFromPlace(placeName).forEach(devInfo => {
                tab.addDevice(new DeviceInstance(devInfo));
            });

            this.places.push(tab);
            places.appendChild(tab);
        });
        this.places[0].show();
        console.log(this.model.getPlaces());
    }

}

class HomeView {

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

class PlaceTab extends BaseComponent {
    constructor(id:string) {
        super();
        this.id = id;
        this.sheet.insertRule(`:host {
            display: none;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto;
            min-height:100%;
            align-content: center;
            background: orange;
        }`);

    }

    public addDevice(dev: DeviceInstance) {
        this.appendChild(dev);
    }

    public show() {
        console.log(this.root.adoptedStyleSheets);
        this.root.adoptedStyleSheets[0].rules[0].style.display = 'grid';
        // this.root.classList.add('Active');
    }

    public hide() {
        this.root.adoptedStyleSheets[0].rules[0].display = 'none';
        this.root.classList.remove('Active');
    }

}

class DeviceInstance extends BaseComponent {
    constructor(deviceInfo:Object) {
        super();
        this.sheet.insertRule(`div.tabs {
            display: grid;
            grid-row-gap: 0.5rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr auto;
            min-height:100%;
            align-content: center;
            background: orange;
        }`);
        if (deviceInfo['sid']) {
            this.id = deviceInfo['sid'];
        }
        console.log(deviceInfo['sid']);
    }

}

class DeviceModel {

}

window.customElements.define('home-app', HomeApp);
window.customElements.define('place-tab', PlaceTab);
window.customElements.define('device-instance', DeviceInstance);
