import { ArrowsView } from "./ArrowsView.js";
import { ButtonExitView } from "./ButtonExitView.js";
import { ButtonReturnView } from "./ButtonReturnView.js";
import { ColorTemperatureView } from "./ColorTemperatureView.js";
import { HumidityStatusView } from "./HumidityStatusView.js";
import { IlluminanceStatusView } from "./IlluminanceStatusView.js";
import { MediaButtonsView } from "./MediaButtonsView.js";
import { VolumeView } from "./VolumeView.js";
import { MotionStatusView } from "./MotionStatusView.js";
import { MultiSwitchView } from "./MultiSwitchView.js";
import { OnOffView } from "./OnOffView.js";
import { OpenCloseView } from "./OpenCloseView.js";
import { PressureStatusView } from "./PressureStatusView.js";
import { RgbView } from "./RgbView.js";
import { ChannelsView } from "./ChannelsView.js";
import { TemperatureStatusView } from "./TemperatureStatusView.js";
import { DimmerView } from "./DimmerView.js";
import { ContactView } from "./ContactView.js";
import { Trait } from "./Trait.js";
export { TraitsFactory };

class TraitsFactory {
    static getTrait(traitName:string): Trait | undefined {
        let ret: Trait | undefined = undefined;

        switch(traitName) {
            case "OnOff": {
                ret = new OnOffView();
                break;
            }

            case "MultiSwitch": {
                ret = new MultiSwitchView();
                break;
            }

            case "Rgb": {
                ret = new RgbView();
                break;
            }
            
            case "Dimmer": {
                ret = new DimmerView();
                break;
            }

            case "ColorTemperature": {
                ret = new ColorTemperatureView();
                break;
            }

            case "TemperatureStatus": {
                ret = new TemperatureStatusView();
                break;
            }

            case "PressureStatus": {
                ret = new PressureStatusView();
                break;
            }

            case "HumidityStatus": {
                ret = new HumidityStatusView();
                break;
            }

            case "OpenClose": {
                ret = new OpenCloseView();
                break;
            }

            case "MotionStatus": {
                ret = new MotionStatusView();
                break;
            }

            case "IlluminanceStatus": {
                ret = new IlluminanceStatusView();
                break;
            }

            case "Arrows": {
                ret = new ArrowsView();
                break;
            }

            case "ButtonReturn": {
                ret = new ButtonReturnView();
                break;
            }

            case "ButtonExit": {
                ret = new ButtonExitView();
                break;
            }

            case "MediaButtons": {
                ret = new MediaButtonsView();
                break;
            }

            case "Volume": {
                ret = new VolumeView();
                break;
            }

            case "Channels": {
                ret = new ChannelsView();
                break;
            }

            case "Contact": {
                ret = new ContactView();
                break;
            }

            default: {
                console.log(`unsupported trait: ${traitName}`);
                break;
            }
        }
        return ret;
    }
}
