import { BaseComponent } from "./BaseComponent";

export class RangeSet extends BaseComponent {
    private input: HTMLInputElement;
    private label: HTMLLabelElement;
    private sliderColor: string;

    constructor(name: string = "Range", sliderColor: string = "var(--widget-color)") {
        super();
        this.sliderColor = sliderColor;
        this.cssSheet.insertRule(`input[type=range] {
        -webkit-appearance: none;
        margin: 18px 0;
        width: 100%;
        }`);

        this.cssSheet.insertRule(`input[type=range]:focus {
        outline: none;
        }`);

        try {
            this.cssSheet.insertRule(`input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
                background: ${this.sliderColor};
                border-radius: 1.3px;
                border: 0.2px solid #010101;
            }`);
            this.cssSheet.insertRule(`input[type=range]::-webkit-slider-thumb {
                box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
                border: 1px solid #000000;
                height: 2rem;
                width: 2rem;
                border-radius: 3px;
                background: #ffffff;
                cursor: pointer;
                -webkit-appearance: none;
                margin-top: -14px;
            }`);

            this.cssSheet.insertRule(`input[type=range]:focus::-webkit-slider-runnable-track {
                background: ${this.sliderColor};
            }`);
        } catch (e) {
            // console.log(e);
        }

        try {
            this.cssSheet.insertRule(`input[type=range]::-moz-range-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            background: ${this.sliderColor};
            border-radius: 1.3px;
            border: 0.2px solid #010101;
        }`);

            this.cssSheet.insertRule(`input[type=range]::-moz-range-thumb {
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            border: 1px solid #000000;
            height: 2rem;
            width: 2rem;
            border-radius: 3px;
            background: #ffffff;
            cursor: pointer;
        }`);


        } catch (e) {
            // console.log(e);
        }

        this.cssSheet.insertRule(`label {
        color: white;
        text-align: center;
    }`);

        this.cssSheet.insertRule(`:host {
        display:grid;
        gap: 1rem;
        grid-template-columns: 1fr;
        justify-content: center;
        align-items: center;
        justify-items: center;
    }`);

        this.label = document.createElement("label");
        this.label.innerText = name;
        this.input = document.createElement("input");
        this.input.type = "range";
        this.input.step = "1";
        this.input.min = "1";
        this.input.max = "100";
        this.root.appendChild(this.label);
        this.root.appendChild(this.input);
        this.input.addEventListener('change', () => {
            this.dispatchEvent(new Event('change'));
        });
    }

    public set value(value: string) {
        this.input.value = value;
    }

    public get value(): string {
        return this.input.value;
    }
}

window.customElements.define('input-range', RangeSet);
