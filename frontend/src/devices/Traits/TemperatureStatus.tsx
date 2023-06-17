import React from 'react';
import { TraitIcon } from './TraitIcon';


interface ITemperatureStatusProps {
  sid: string;
  temperature: number;
}


const TemperatureStatus:React.FC<ITemperatureStatusProps> = (props:ITemperatureStatusProps) => {

  return (
    <div className='grid justify-end'>
      <div className='grid grid-flow-col grid-cols-3 justify-items-center items-center text-secondary'>
        <TraitIcon name='thermometer' />
        <span>{Math.round(props.temperature)}</span>
        <span>&#8451;</span>
      </div>
    </div>
  );
};

export {TemperatureStatus};
