import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceInfo } from "../reducers/devicesReducer";
import { MaterialSymbols } from "../components/MaterialSymbols";
import { Contact } from "./Traits/Contact";
import { DoubleSwitchMain } from "./Traits/DoubleSwitchMain";
import { HumidityStatus } from "./Traits/HumidityStatus";
import { MotionStatus } from "./Traits/MotionStatus";
import { OnOffMain } from "./Traits/OnOffMain";
import { TemperatureStatus } from "./Traits/TemperatureStatus";

interface IDeviceProps {
  info: DeviceInfo;
}

const Device: React.FC<IDeviceProps> = (props: IDeviceProps) => {
  const navigate = useNavigate();

  const mainTraitsList: Array<string> = [
    "OnOff",
    "DoubleSwitch",
    "TemperatureStatus",
    "HumidityStatus",
    "Contact",
    "MotionStatus",
  ];

  const mainTraits = () => {
    return props.info.traits.map((traitName) => {
      if (mainTraitsList.includes(traitName)) {
        switch (traitName) {
          case "OnOff": {
            return (
              <OnOffMain
                sid={props.info.sid}
                power={props.info.state}
                key={traitName}
              />
            );
          }
          case "DoubleSwitch": {
            return (
              <DoubleSwitchMain
                sid={props.info.sid}
                left={props.info.state_left}
                right={props.info.state_right}
                key={traitName}
              />
            );
          }
          case "TemperatureStatus": {
            return (
              <TemperatureStatus
                sid={props.info.sid}
                key={traitName}
                temperature={props.info.temperature}
              />
            );
          }
          case "HumidityStatus": {
            return (
              <HumidityStatus
                sid={props.info.sid}
                key={traitName}
                humidity={props.info.humidity}
              />
            );
          }
          case "Contact": {
            return (
              <Contact
                sid={props.info.sid}
                key={traitName}
                contact={props.info.contact}
              />
            );
          }
          case "MotionStatus": {
            return (
              <MotionStatus
                sid={props.info.sid}
                key={traitName}
                occupancy={props.info.occupancy}
              />
            );
          }
        }
      }
      return null;
    });
  };

  return (
    <div className="p-1 bg-surface rounded grid grid-cols-5 gap-x-05">
      <div
        className="grid grid-cols-3 col-span-3 items-center"
        onClick={() => navigate(`/dev/${props.info.sid}`)}
      >
        <div className="grid col-span-1 items-center text-secondary">
          <MaterialSymbols name={props.info.icon || "sensors"} />
        </div>
        <div className="col-span-2">{props.info.name}</div>
      </div>
      <div className="col-span-2 grid">{mainTraits() || <></>}</div>
    </div>
  );
};

export { Device };
