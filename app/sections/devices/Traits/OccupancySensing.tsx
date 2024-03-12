import React from 'react';
import { TraitIcon } from './TraitIcon';


interface IOccupancySensingProps {
  sid: string;
  occupancy: boolean;
}


const OccupancySensing:React.FC<IOccupancySensingProps> = (props:IOccupancySensingProps) => {

  return (
      <div className='text-secondary justify-self-center'>
          <TraitIcon name={props.occupancy ? 'sensor_occupied': 'motion_sensor_active'} status={props.occupancy}/>
      </div>
  );
};

export {OccupancySensing};
