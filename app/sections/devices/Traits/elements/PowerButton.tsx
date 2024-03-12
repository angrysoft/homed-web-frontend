import React from 'react';
import { MaterialSymbols } from '../../../../components/MaterialSymbols';


interface IPowerButtonProps {
  handleClick: ()=>void;
  status: boolean;
}


const PowerButton:React.FC<IPowerButtonProps> = (props:IPowerButtonProps) => {
  let classes = "col-span-2 grid items-center p-05 justify-center border-2 rounded-xl";
  props.status ? classes+=" text-primary border-primary" : classes+=" text-onSurface border-onSurface";

  return (
    <button
      className={classes}
      onClick={props.handleClick}>
      <MaterialSymbols name='power_rounded' />
    </button>
  );
};

export {PowerButton};
