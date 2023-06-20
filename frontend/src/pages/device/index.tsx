import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { TraitsFactory } from "../../devices/TraitsFactory";
import { DeviceInfo } from "../../reducers/devicesReducer";
import { AppContext } from "../../store";

interface IDeviceDetailsProps {}

const DeviceDetails: React.FC<IDeviceDetailsProps> = (
  props: IDeviceDetailsProps,
) => {
  const navigate = useNavigate();
  const { sid } = useParams();
  const { state } = useContext(AppContext);
  const devInfo: DeviceInfo = state.devices[sid || ""];

  return (
    <div className="h-screen w-screen bg-background">
      <header className="bg-surface p-1 grid grid-cols-4">
        <div
          className="grid content-center text-onSurface"
          onClick={() => navigate("/")}
        >
          <MaterialSymbols name="arrow_back" />
        </div>
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
