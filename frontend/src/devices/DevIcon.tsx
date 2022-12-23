import React from 'react';


interface IDevIconProps {
  name: string;
}


const DevIcon:React.FC<IDevIconProps> = (props:IDevIconProps) => {
  return (
    <span className='material-symbols-outlined text-secondary'>
      {props.name}
    </span>
  );
};

export {DevIcon};
