import React, { useEffect, useState } from "react";
import { IDevices } from "../../context/deviceContext";
import { Device } from "./Device";

interface IDevicesProps {
  devices: IDevices;
  selectedPlace: string;
}

const Devices: React.FC<IDevicesProps> = (props: IDevicesProps) => {
  const [devices, setDevices] = useState<React.ReactNode>();

  useEffect(() => {
    setDevices(
      Object.entries(props.devices).map(([sid, dev]) => {
        if (dev.place === props.selectedPlace)
          return <Device key={sid} info={dev} />;
      }),
    );
  }, [props.selectedPlace, props.devices]);

  return (
    <div className="p-1 grid md:justify-around md:grid-cols-devices gap-05 overflow-y-auto overflow-x-hidden">
      {devices}
    </div>
  );
};

export { Devices };
