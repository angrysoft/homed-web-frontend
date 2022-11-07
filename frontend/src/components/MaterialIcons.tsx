import React from 'react';


interface MaterialIconsProps {
  name: string;
}


const MaterialIcons = (props:MaterialIconsProps) => {
  return (
    <span className='material-icons leading-1'>{props.name}</span>
  );
};

export {MaterialIcons};