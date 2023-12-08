import * as React from 'react';

interface IWidgetWrapperProps {
  children: React.ReactNode;
}

const WidgetWrapper: React.FunctionComponent<IWidgetWrapperProps> = (props) => {
  return (
    <div className='grid justify-end text-onSurface'>{props.children}</div>
  );
};

export default WidgetWrapper;
