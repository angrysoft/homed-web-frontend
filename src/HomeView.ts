import { BaseComponent } from "./components.js";
import { PlaceView } from "./PlaceView.js";

export class HomeView extends BaseComponent {
    private main: HTMLElement;
    private header: HTMLElement;
    private devices: HTMLElement;
    private footer: HTMLElement;

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
            justify-co
            Salon
            Łazienka
            Kuchnia
            tent: space-around;
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

        this.header.addEventListener('click', (el)=>{
            this.setPlaceFilter(el.target as HTMLElement); 
        });

    }

    private setPlaceFilter(place:HTMLElement | null) {
        console.log(place, typeof(place));
        if (place === null || place.tagName.toLowerCase() != 'place-view') {return;}

        document.querySelectorAll('place-view.selected').forEach((sel)=> {
            sel.classList.remove('selected');
        });

        place.classList.add('selected');
        let name:string = place.innerText;

        for (let i = 0; i< this.devices.children.length; i++) {
            let placeName = this.devices.children[i].getAttribute('place');
            let el = this.devices.children[i] as HTMLElement; 
            if (placeName != undefined && placeName?.indexOf(name) < 0 ) {
                el.style.display = "none";
            } else {
                el.style.display = "";
            }
        }
    }

    public addDevice(devView: HTMLElement) {
        this.devices.appendChild(devView);
    }

    public delDevice(devView: HTMLElement) {
        this.devices.removeChild(devView);
    }

    public addPlaces(places:Set<string>) {
        places.forEach(place=> {
            this.header.appendChild(new PlaceView(place));
        });
        this.setPlaceFilter(this.header.children[0] as HTMLElement);
    }

    public render() {
        this.root.appendChild(this.main);
        document.body.appendChild(this);
    }
}
