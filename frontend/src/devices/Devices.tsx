import React, { useContext } from "react";
import { AppContext } from "../store";
import { Device } from "./Device";

interface IDevicesProps {
  children?: JSX.Element | JSX.Element[];
}

const Devices: React.FC<IDevicesProps> = (props: IDevicesProps) => {
  const { state } = useContext(AppContext);

  const devicesList = () => {
    const _devices = Object.entries(state.devices).filter(([sid, dev]) => {
      if (dev.place === state.places.selected) {
        return true;
      }
      return false;
    }).map(([sid, dev]) => {
      return <Device key={sid} info={dev} />;
    });
    return _devices;
  };

  return (
    <div className="p-1 grid md:justify-around md:grid-cols-devices gap-05 overflow-y-auto overflow-x-hidden">
      {devicesList()}
    </div>
  );
};

export { Devices };
