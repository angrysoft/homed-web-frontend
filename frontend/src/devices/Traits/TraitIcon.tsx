import React from 'react';


interface ITraitIconProps {
  name: string;
  status?: boolean
}


const TraitIcon:React.FC<ITraitIconProps> = (props:ITraitIconProps) => {
  let classes = 'material-symbols-outlined';
  if (props.status) {
    classes += " text-primary";
  }

  return (
    <span className={classes}>
      {props.name}
    </span>
  );
};

export {TraitIcon};
