import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className="animate-spin inline-block
                   w-8 h-8 border-[1rem] rounded-full
                   border-t-indigo-500"
        role="status"
      >
      </div>
    </div>
  );
};

export default Loader;