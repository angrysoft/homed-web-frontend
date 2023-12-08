import React from 'react';
import { TraitIcon } from './TraitIcon';


interface IMotionStatusProps {
  sid: string;
  occupancy: boolean;
}


const MotionStatus:React.FC<IMotionStatusProps> = (props:IMotionStatusProps) => {

  return (
      <div className='text-secondary justify-self-center'>
          <TraitIcon name={props.occupancy ? 'sensor_occupied': 'motion_sensor_active'} status={props.occupancy}/>
      </div>
  );
};

export {MotionStatus};
