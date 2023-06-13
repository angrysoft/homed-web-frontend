import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { ColorTemperature } from "../../devices/Traits/ColorTemperature";
import { Dimmer } from "../../devices/Traits/Dimmer";
import { DoubleSwitch } from "../../devices/Traits/DoubleSwitch";
import { OnOff } from "../../devices/Traits/OnOff";
import { Rgb } from "../../devices/Traits/Rgb";
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

  const traits = () => {
    return devInfo.traits.map((traitName) => {
      switch (traitName) {
        case "OnOff": {
          return (
            <OnOff sid={devInfo.sid} power={devInfo.power} key={traitName} />
          );
        }

        case "Dimmer": {
          return (
            <Dimmer sid={devInfo.sid} key={traitName} bright={devInfo.bright} />
          );
        }

        case "ColorTemperature": {
          return (
            <ColorTemperature
              sid={devInfo.sid}
              key={traitName}
              ct={devInfo.ct}
            />
          );
        }

        case "Rgb": {
          return <Rgb sid={devInfo.sid} key={traitName} rgb={devInfo.rgb} />;
        }

        case "DoubleSwitch": {
          return (
            <DoubleSwitch
              sid={devInfo.sid}
              left={devInfo.state_left}
              right={devInfo.state_right}
              key={traitName}
            />
          );
        }
        // case "TemperatureStatus": {
        //   return (
        //     <TemperatureStatus
        //       sid={props.info.sid}
        //       key={traitName}
        //       temperature={props.info.temperature}
        //     />
        //   );
        // }
        // case "HumidityStatus": {
        //   return (
        //     <HumidityStatus
        //       sid={props.info.sid}
        //       key={traitName}
        //       humidity={props.info.humidity}
        //     />
        //   );
        // }
        // case "Contact": {
        //   return (
        //     <Contact
        //       sid={props.info.sid}
        //       key={traitName}
        //       contact={props.info.contact}
        //     />
        //   );
        // }
        // case "MotionStatus": {
        //   return (
        //     <MotionStatus
        //       sid={props.info.sid}
        //       key={traitName}
        //       occupancy={props.info.occupancy}
        //     />
        //   );
        // }
        default:
          return (
            <div key={traitName} className="text-onSurface">
              {traitName}
            </div>
          );
      }
    });
  };

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
      <section className="p-1 grid gap-1">{traits()}</section>
    </div>
  );
};

export default DeviceDetails;
