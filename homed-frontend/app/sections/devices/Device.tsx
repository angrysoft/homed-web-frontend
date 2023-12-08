import React from "react";
import { DeviceInfo } from "../../reducers/devicesReducer";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { TraitsFactory } from "./TraitsFactory";
import WidgetWrapper from "./Traits/elements/WidgetWrapper";
import Link from "next/link";

interface IDeviceProps {
  info: DeviceInfo;
}

const Device: React.FC<IDeviceProps> = (props: IDeviceProps) => {
  return (
    <div className="p-1 bg-surface rounded grid grid-cols-5 gap-x-05">
      <Link
        className="grid grid-cols-3 col-span-3 items-center"
        href={`/device/${props.info.sid}`}
      >
        <div className="grid col-span-1 items-center text-secondary">
          <MaterialSymbols name={props.info.icon || "sensors"} />
        </div>
        <div className="col-span-2 text-onSurface">{props.info.name}</div>
      </Link>
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
