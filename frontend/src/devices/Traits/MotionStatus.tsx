import React from 'react';
import { TraitIcon } from './TraitIcon';


interface IMotionStatusProps {
  sid: string;
  occupancy: boolean;
}


const MotionStatus:React.FC<IMotionStatusProps> = (props:IMotionStatusProps) => {

  return (
    <div className='grid justify-end'>
      <div className='text-secondary'>
        {
          props.occupancy ? 
          <TraitIcon name='sensor_occupied'/>
          :
          <TraitIcon name='motion_sensor_active'/>
        }
      </div>
    </div>
  );
};

export {MotionStatus};
