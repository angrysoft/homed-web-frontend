import React from 'react';
import { useSendCmd } from '../../hooks/useSendCmd';
import { TraitIcon } from './TraitIcon';


interface IOnOffMainProps {
  sid: string;
  power: string;
}


const OnOffMain:React.FC<IOnOffMainProps> = (props:IOnOffMainProps) => {
  const send = useSendCmd();

  return (
    <div className='grid justify-end'>
      <div onClick={() => send(props.sid, props.power === "on" ? "off" : "on", null)}>
        <TraitIcon name='power_rounded' status={(props.power === "on") ? true : false} />
      </div>
    </div>
  );
};

export {OnOffMain};
