import React from "react";
import { DeviceInfo } from "../../reducers/devicesReducer";
import { Device } from "./Device";

interface IDevicesProps {
  deviceList: [string, DeviceInfo][];
}

const Devices: React.FC<IDevicesProps> = (props: IDevicesProps) => {
  
  const _devices = props.deviceList.map(([sid, dev]) => {
    return <Device key={sid} info={dev} />;
  });

  return (
    <div className="p-1 grid md:justify-around md:grid-cols-devices gap-05 overflow-y-auto overflow-x-hidden">
      {_devices}
    </div>
  );
};

export { Devices };
