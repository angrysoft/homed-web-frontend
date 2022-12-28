import React from 'react';
import { MaterialSymbols } from '../../components/MaterialSymbols';
import { useSendCmd } from '../../hooks/useSendCmd';
import { TraitIcon } from './TraitIcon';


interface IDoubleSwitchProps {
  sid: string;
  left: string;
  right: string;
}


const DoubleSwitch:React.FC<IDoubleSwitchProps> = (props:IDoubleSwitchProps) => {
  const send = useSendCmd();

  return (
    <div className='grid bg-surface p-1 w-full rounded-xl'>
      <div className="grid gap-1 grid-cols-5 items-center text-secondary">
        <MaterialSymbols name="bolt" />
        <div
          className='col-span-2 grid items-center p-05 justify-center border-primary border-2 rounded-xl'
          onClick={() => send(props.sid, "left", (props.left.toLowerCase() === "on") ? "off" : "on")}>
          <TraitIcon name='power_rounded' status={(props.left.toLowerCase() === "on") ? true : false} />
          </div>
        <div
          className='col-span-2 grid items-center p-05 justify-center border-primary border-2 rounded-xl'
          onClick={() => send(props.sid, "right", (props.right.toLowerCase() === "on") ? "off" : "on")}>
          <TraitIcon name='power_rounded' status={(props.right.toLowerCase() === "on") ? true : false} />
        </div>
      </div>
    </div>
  );
};

export {DoubleSwitch};
