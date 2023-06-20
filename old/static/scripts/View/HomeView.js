import { BaseComponent } from "../WebComponents/BaseComponent.js";
import { PlaceView } from "./PlaceView.js";
export class HomeView extends BaseComponent {
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
        this.cssSheet.insertRule(`main {
            display: grid;
            grid-row-gap: 0.2rem;
            grid-template-columns: auto;
            grid-template-rows: auto 1fr auto;
            min-height:100%;
            max-height:100%;
            align-content: center;
        }`);
        this.cssSheet.insertRule(`section {
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
        this.cssSheet.insertRule(`header {
            display: flex;
            padding: 2rem 0.5rem 1rem;
            overflow-x: auto;
            gap: 1rem;
            white-space: pre;
        }`);
        this.cssSheet.insertRule(`footer {
            display: flex;
            justify-content: space-between; 
            padding: 1rem;
            background: black;
        }`);
        this.header.addEventListener('click', (el) => {
            this.setPlaceFilter(el.target);
        });
    }
    setPlaceFilter(place) {
        if (place === null || place.tagName.toLowerCase() != 'place-view') {
            return;
        }
        document.querySelectorAll('place-view.selected').forEach((sel) => {
            sel.classList.remove('selected');
        });
        place.classList.add('selected');
        let name = place.innerText;
        for (let child of this.devices.children) {
            let placeName = child.getAttribute('place');
            let el = child;
            if (placeName != undefined && (placeName === null || placeName === void 0 ? void 0 : placeName.indexOf(name)) < 0) {
                el.style.display = "none";
            }
            else {
                el.style.display = "";
            }
        }
    }
    addDevice(devView) {
        this.devices.appendChild(devView);
    }
    delDevice(devView) {
        this.devices.removeChild(devView);
    }
    addPlaces(places) {
        places.forEach(place => {
            this.header.appendChild(new PlaceView(place));
        });
    }
    render() {
        this.root.appendChild(this.main);
        document.body.appendChild(this);
        this.setPlaceFilter(this.header.children[0]);
    }
}
window.customElements.define('home-view', HomeView);
