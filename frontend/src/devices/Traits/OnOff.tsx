import React from 'react';
import { useSendCmd } from '../../hooks/useSendCmd';
import { TraitIcon } from './TraitIcon';


interface IOnOffProps {
  sid: string;
  power: string;
}


const OnOff:React.FC<IOnOffProps> = (props:IOnOffProps) => {
  const send = useSendCmd();

  return (
    <div className='grid justify-end'>
      <div onClick={() => send(props.sid, "power", (props.power === "on") ? "off" : "on")}>
        <TraitIcon name='power_rounded' status={(props.power === "on") ? true : false} />
      </div>
    </div>
  );
};

export {OnOff};
