import React from "react";

const MainLoader = () => {
  return (
    <div className="grid grid-flow-col justify-center content-center gap-1 bg-background h-screen text-onBackground">
      <div
        className="animate-[pulse_1s_0ms_ease-in-out_infinite] bg-primary
                   w-2 h-2 rounded-full delay-500"
        role="status"
      ></div>
      <div
        className="animate-[pulse_1s_200ms_ease-in-out_infinite] bg-primary
                   w-2 h-2 rounded-full duration-1500"
        role="status"
      ></div>
      <div
        className="animate-[pulse_1s_400ms_ease-in-out_infinite] bg-primary
                   w-2 h-2 rounded-full duration-500"
        role="status"
      ></div>
    </div>
  );
};

export default MainLoader;
