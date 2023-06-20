import React from "react";
import { DeviceInfo } from "../reducers/devicesReducer";
import { Contact } from "./Traits/Contact";
import { DoubleSwitch } from "./Traits/DoubleSwitch";
import { HumidityStatus } from "./Traits/HumidityStatus";
import { IlluminanceStatus } from "./Traits/Illuminance";
import { MotionStatus } from "./Traits/MotionStatus";
import { TemperatureStatus } from "./Traits/TemperatureStatus";
import { OnOff } from "./Traits/OnOff";
import { Dimmer } from "./Traits/Dimmer";
import { ColorTemperature } from "./Traits/ColorTemperature";
import { RgbColor } from "./Traits/RgbColor";

interface ITraitsFactoryProps {
  trait: string;
  info: DeviceInfo;
  main: boolean;
  wrapped?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const mainTraits = [
  "OnOff",
  "DoubleSwitch",
  "Temperature",
  "Contact",
  "Motion",
];

const TraitsFactory: React.FC<ITraitsFactoryProps> = (
  props: ITraitsFactoryProps,
) => {
  let trait = <></>;
  if (props.main && mainTraits.indexOf(props.trait) < 0) return trait;

  switch (props.trait) {
    case "OnOff": {
      trait = <OnOff sid={props.info.sid} power={props.info.state} />;
      break;
    }

    case "DoubleSwitch": {
      trait = (
        <DoubleSwitch
          sid={props.info.sid}
          left={props.info.state_left}
          right={props.info.state_right}
        />
      );
      break;
    }

    case "Temperature": {
      trait = (
        <TemperatureStatus
          sid={props.info.sid}
          temperature={props.info.temperature}
        />
      );
      break;
    }

    case "Humidity": {
      trait = (
        <HumidityStatus sid={props.info.sid} humidity={props.info.humidity} />
      );
      break;
    }

    case "Contact": {
      trait = <Contact sid={props.info.sid} contact={props.info.contact} />;
      break;
    }

    case "Motion": {
      trait = (
        <MotionStatus sid={props.info.sid} occupancy={props.info.occupancy} />
      );
      break;
    }

    case "Illuminance": {
      trait = (
        <IlluminanceStatus
          sid={props.info.sid}
          lux={props.info.illuminance_lux}
        />
      );
      break;
    }

    case "Dimmer": {
      trait = <Dimmer sid={props.info.sid} bright={props.info.bright} />;
      break;
    }

    case "ColorTemperature": {
      trait = <ColorTemperature sid={props.info.sid} ct={props.info.ct} />;
      break;
    }

    case "RgbColor": {
      trait = <RgbColor sid={props.info.sid} rgb={props.info.rgb} />;
      break;
    }
    default:
      return trait;
  }

  if (props.wrapped)
    return (
      <div className="p-1 bg-surface rounded grid grid-flow-col items-center">
        {trait}
      </div>
    );

  return trait;
};

export { TraitsFactory };
