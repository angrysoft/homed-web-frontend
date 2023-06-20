import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { ColorTemperature } from "../../devices/Traits/ColorTemperature";
import { Dimmer } from "../../devices/Traits/Dimmer";
import { DoubleSwitch } from "../../devices/Traits/DoubleSwitch";
import { OnOff } from "../../devices/Traits/OnOff";
import { Rgb } from "../../devices/Traits/Rgb";
import { TemperatureStatus } from "../../devices/Traits/TemperatureStatus";
import { DeviceInfo } from "../../reducers/devicesReducer";
import { AppContext } from "../../store";
import { HumidityStatus } from "../../devices/Traits/HumidityStatus";

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
      let el = <>{traitName}</>;
      switch (traitName) {
        case "OnOff": {
          el = (
            <OnOff sid={devInfo.sid} power={devInfo.state} key={traitName} />
          );
          break;
        }

        case "Dimmer": {
          el = (
            <Dimmer sid={devInfo.sid} key={traitName} bright={devInfo.bright} />
          );
          break;
        }

        case "ColorTemperature": {
          el = (
            <ColorTemperature
              sid={devInfo.sid}
              key={traitName}
              ct={devInfo.ct}
            />
          );
          break;
        }

        case "Rgb": {
          el = <Rgb sid={devInfo.sid} key={traitName} rgb={devInfo.rgb} />;
          break;
        }

        case "DoubleSwitch": {
          el = (
            <DoubleSwitch
              sid={devInfo.sid}
              left={devInfo.state_left}
              right={devInfo.state_right}
              key={traitName}
            />
          );
          break;
        }
        case "Temperature": {
          el = (
            <TemperatureStatus
              sid={devInfo.sid}
              key={traitName}
              temperature={devInfo.temperature}
            />
          );
          break;
        }
        case "HumidityStatus": {
          el = (
            <HumidityStatus
              sid={devInfo.sid}
              key={traitName}
              humidity={devInfo.humidity}
            />
          );
          break;
        }
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
      }
      return (
        <div key={traitName} className="text-onSurface bg-surface p-1 rounded">
          {el}
        </div>
      );
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
