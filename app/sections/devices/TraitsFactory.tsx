import React from "react";
import { DeviceInfo } from "../../context/DeviceInfo";
import { ColorTemperature } from "./Traits/ColorTemperature";
import { Contact } from "./Traits/Contact";
import { Dimmer } from "./Traits/Dimmer";
import { DoubleSwitch } from "./Traits/DoubleSwitch";
import { HumidityStatus } from "./Traits/HumidityStatus";
import { IlluminanceStatus } from "./Traits/Illuminance";
import { OccupancySensing } from "./Traits/OccupancySensing";
import { OnOff } from "./Traits/OnOff";
import { RgbColor } from "./Traits/RgbColor";
import { TemperatureStatus } from "./Traits/TemperatureStatus";
import { SingleSwitch } from "./Traits/SingleSwitch";
import { AmbientLight } from "./Traits/AmbientLight";
import { Paper } from "@mui/material";

interface ITraitsFactoryProps {
  trait: string;
  info: DeviceInfo;
  main?: boolean;
}

const mainTraits = [
  "OnOff",
  "SingleSwitch",
  "DoubleSwitch",
  "TripleSwitch",
  "TemperatureReport",
  "Contact",
  "OccupancySensing",
];

const TraitsFactory: React.FC<ITraitsFactoryProps> = (
  props: ITraitsFactoryProps,
) => {
  let trait = <></>;
  if (props.main && mainTraits.indexOf(props.trait) < 0) return trait;

  switch (props.trait) {
    case "OnOff": {
      trait = (
        <OnOff
          sid={props.info.sid}
          power={props.info.state}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "SingleSwitch": {
      trait = (
        <SingleSwitch
          sid={props.info.sid}
          outlet={props.info.outlet}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "DoubleSwitch": {
      trait = (
        <DoubleSwitch
          sid={props.info.sid}
          outlet0={props.info.outlet0}
          outlet1={props.info.outlet1}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "TemperatureReport": {
      trait = (
        <TemperatureStatus
          sid={props.info.sid}
          temperature={props.info.temperature}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "HumidityReport": {
      trait = (
        <HumidityStatus
          sid={props.info.sid}
          humidity={props.info.humidity}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "Contact": {
      trait = (
        <Contact
          sid={props.info.sid}
          contact={props.info.contact}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "OccupancySensing": {
      trait = (
        <OccupancySensing
          sid={props.info.sid}
          occupancy={props.info.occupancy}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "Illuminance": {
      trait = (
        <IlluminanceStatus
          sid={props.info.sid}
          lux={props.info.illuminance_lux}
          showTitle={!props.main}
        />
      );
      break;
    }

    case "Brightness": {
      trait = <Dimmer sid={props.info.sid} bright={props.info.bright} />;
      break;
    }

    case "ColorTemperature": {
      let pc = props.info.ct;
      if (props.info.minCt && props.info.maxCt) {
        pc = Math.ceil(
          ((Number(props.info.ct) - Number(props.info.minCt)) /
            (Number(props.info.maxCt) - Number(props.info.minCt))) *
            100,
        );
      }
      trait = <ColorTemperature sid={props.info.sid} ct={pc} />;
      break;
    }

    case "RgbColor": {
      trait = <RgbColor sid={props.info.sid} rgb={props.info.rgb} />;
      break;
    }

    case "AmbientLight": {
      trait = (
        <AmbientLight
          sid={props.info.sid}
          power={props.info.ambientLight}
          showTitle={!props.main}
        />
      );
      break;
    }

    default:
      return trait;
  }

  if (props.main) return trait;

  return <Paper>{trait}</Paper>;
};

export { TraitsFactory };
