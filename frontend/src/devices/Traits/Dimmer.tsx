import React from 'react';
import { MaterialSymbols } from '../../components/MaterialSymbols';
import { useSendCmd } from '../../hooks/useSendCmd';


interface IDimmerProps {
  sid: string;
  bright?: string;
}


const Dimmer:React.FC<IDimmerProps> = (props:IDimmerProps) => {
  const send = useSendCmd();

  return (
    <div className='grid bg-surface p-1 w-full rounded-xl'>
      <div className='grid grid-cols-4 content-center text-onSurface' onClick={() => send(props.sid, "bright", 100)}>
        <MaterialSymbols name='light_mode'/>
        <input
          type="range"
          className="col-span-3 w-full rounded-xl appearance-none cursor-pointer bg-gradient-to-r from-black to-white"
          step="1"
          min="1"
          max="100"
        />
      </div>
    </div>
  );
};

export {Dimmer};
