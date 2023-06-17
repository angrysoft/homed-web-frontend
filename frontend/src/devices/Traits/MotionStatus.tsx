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
          <TraitIcon name={props.occupancy ? 'sensor_occupied': 'motion_sensor_active'} status={props.occupancy}/>
      </div>
    </div>
  );
};

export {MotionStatus};
