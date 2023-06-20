import { BaseComponent } from "./components.js";
export declare class HomeView extends BaseComponent {
    private main;
    private header;
    private devices;
    private footer;
    constructor();
    private setPlaceFilter;
    addDevice(devView: HTMLElement): void;
    delDevice(devView: HTMLElement): void;
    addPlaces(places: Set<string>): void;
    render(): void;
}
