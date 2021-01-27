class Place extends HTMLDivElement {
    public name: string;
    constructor(name:string, id:string) {
        super();
        this.name = name;
        this.id = id;
    }
}

class PlaceName extends HTMLElement {
    constructor(name:string) {
        super();
        this.innerHTML = "<div class=\"row center-xs place-name\"><div class=\"col-xs-12 txt-center\"><p>${name}</p></div></div>";
    }
}