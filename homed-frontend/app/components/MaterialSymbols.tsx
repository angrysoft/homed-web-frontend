import React from 'react';

interface IMaterialSymbolsProps {
  name: string;
}


const MaterialSymbols:React.FC<IMaterialSymbolsProps> = (props:IMaterialSymbolsProps) => {
  return (
    <span className='material-symbols-outlined select-none'>
      {props.name}
    </span>
  );
};

export {MaterialSymbols};
