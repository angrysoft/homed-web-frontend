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
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
            align-content: flex-start;
            gap: 0.5rem;
            overflow-y: auto;
            border-top: 2px solid black;
            padding: 1rem;
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
        if (place === null || place.tagName.toLowerCase() != 'place-view') {return;}

        document.querySelectorAll('place-view.selected').forEach((sel)=> {
            sel.classList.remove('selected');
        });

        place.classList.add('selected');
        let name:string = place.innerText;

        for (let child of  this.devices.children) {
            let placeName = child.getAttribute('place');
            let el = child as HTMLElement; 
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
    }
    
    public render() {
        this.root.appendChild(this.main);
        document.body.appendChild(this);
        this.setPlaceFilter(this.header.children[0] as HTMLElement);
    }
}