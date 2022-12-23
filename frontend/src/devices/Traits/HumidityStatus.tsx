import React from 'react';
import { TraitIcon } from './TraitIcon';


interface IHumidityStatusProps {
  sid: string;
  humidity: number;
}


const HumidityStatus:React.FC<IHumidityStatusProps> = (props:IHumidityStatusProps) => {

  return (
    <div className='grid justify-end'>
      <div className='grid grid-flow-col items-center text-secondary'>
        <TraitIcon name='humidity_percentage' />
        <span>{Math.round(props.humidity)} %</span>
      </div>
    </div>
  );
};

export {HumidityStatus};
