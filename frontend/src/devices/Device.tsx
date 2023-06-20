import React from "react";
import { useNavigate } from "react-router-dom";
import { DeviceInfo } from "../reducers/devicesReducer";
import { MaterialSymbols } from "../components/MaterialSymbols";
import { TraitsFactory } from "./TraitsFactory";
import WidgetWrapper from "./Traits/elements/WidgetWrapper";

interface IDeviceProps {
  info: DeviceInfo;
}

const Device: React.FC<IDeviceProps> = (props: IDeviceProps) => {
  const navigate = useNavigate();
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
      <div className="grid col-span-2">
        {props.info.traits.map((traitName) => (
          <WidgetWrapper key={traitName}>
            <TraitsFactory trait={traitName} info={props.info} main />
          </WidgetWrapper>
        ))}
      </div>
    </div>
  );
};

export { Device };
