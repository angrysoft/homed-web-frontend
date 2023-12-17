'use client'
import React, { useContext } from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { TraitsFactory } from "../../sections/devices/TraitsFactory";
import { DeviceInfo } from "../../reducers/devicesReducer";
import { AppContext } from "../../store";
import Link from "next/link";

interface IDeviceDetailsProps {
  sid: string;
}

const DeviceDetails = ({ params }: { params: { sid: string } }) => {
  const { state } = useContext(AppContext);
  const devInfo: DeviceInfo = state.devices[params.sid];
  return (
    <div className="h-screen w-screen bg-background">
      <header className="bg-surface p-1 grid grid-cols-4">
        <Link className="grid content-center text-onSurface" href={"/"}>
          <MaterialSymbols name="arrow_back" />
        </Link>
        <span className="col-span-2 text-onSurface text-center text-xl">
          {devInfo.name}
        </span>
      </header>
      <section className="p-1 grid gap-1">
        {devInfo.traits.map((traitName) => (
          <TraitsFactory
            key={traitName}
            trait={traitName}
            info={devInfo}
            main={false}
            wrapped
          />
        ))}
      </section>
    </div>
  );
};

export default DeviceDetails;
