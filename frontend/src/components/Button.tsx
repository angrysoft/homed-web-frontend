import React, { useCallback } from 'react';

type ButtonOutlineProps = {
  id?: string;
  children?: React.ReactNode;
  handleClick?: CallableFunction;
  disabled?: boolean;
};

const Button = (props: ButtonOutlineProps) => {
  const handleClick = useCallback(() => (
    props.handleClick && props.handleClick()
  ), [props.handleClick]);

  return (
    <button
      className="w-full p-05 rounded
                 bg-gradient-to-r from-indigo-500 to-blue-500
                 cursor-pointer
                 text-xl font-bold text-center text-white
                 shadow-md hover:shadow-2xl
                 border border-gray-500
                 transition-all-500 transition-all duration-500
                 disabled:opacity-50 disabled:hover:shadow-none"
      id={props.id}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;