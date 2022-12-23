import React from 'react';
import { TraitIcon } from './TraitIcon';


interface IContactProps {
  sid: string;
  contact: boolean;
}


const Contact:React.FC<IContactProps> = (props:IContactProps) => {

  return (
    <div className='grid justify-end'>
      <div className='text-secondary'>
        {
          props.contact ? 
          <TraitIcon name='door_front'/>
          :
          <TraitIcon name='door_open'/>
        }
      </div>
    </div>
  );
};

export {Contact};
