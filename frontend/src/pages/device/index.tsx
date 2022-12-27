import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MaterialSymbols } from '../../components/MaterialSymbols';
import { Dimmer } from '../../devices/Traits/Dimmer';
import { OnOff } from '../../devices/Traits/OnOff';
import { DeviceInfo } from '../../reducers/devicesReducer';
import { AppContext } from '../../store';


interface IDeviceDetailsProps {

}


const DeviceDetails:React.FC<IDeviceDetailsProps> = (props:IDeviceDetailsProps) => {
  const navigate = useNavigate();
  const {sid} = useParams();
  const {state} = useContext(AppContext);
  const devInfo: DeviceInfo = state.devices[sid|| ""];

  const traits = () => {
    return devInfo.traits.map((traitName) => {
      switch (traitName) {
        case "OnOff": {
          return (
            <OnOff
              sid={devInfo.sid}
              power={devInfo.power}
              key={traitName}
            />
          );
        }

        case "Dimmer": {
          return (
            <Dimmer
              sid={devInfo.sid}
              key={traitName}
            />
          );
        }
        // case "DoubleSwitch": {
        //   return (
        //     <DoubleSwitch
        //       sid={props.info.sid}
        //       left={props.info.left}
        //       right={props.info.right}
        //       key={traitName}
        //     />
        //   );
        // }
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
          return <div key={traitName} className='text-onSurface'>{traitName}</div>
      }
      return null;
    });
  };

  return (
    <div className='h-screen w-screen bg-background'>
      <header className='bg-surface p-1 grid grid-cols-4'>
        <div className='grid content-center text-onSurface' onClick={() => navigate("/")}>
          <MaterialSymbols name='arrow_back' />
        </div>
        <span className='col-span-2 text-onSurface text-center text-xl'>{devInfo.name}</span>
      </header>
      <section className='p-1 grid gap-1'>
        {traits()}
      </section>
    </div>
  );
};

export default DeviceDetails;
