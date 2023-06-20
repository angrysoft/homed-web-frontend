import React from "react";
import { TraitIcon } from "./TraitIcon";

interface IIlluminanceStatusProps {
  sid: string;
  lux: number;
}

const IlluminanceStatus: React.FC<IIlluminanceStatusProps> = (
  props: IIlluminanceStatusProps,
) => {
  return (
    <div className="grid gap-01 grid-flow-col items-center text-secondary grid-cols-3 justify-items-center">
      <TraitIcon name="light_mode" />
      <span>{Math.round(props.lux)}</span>
      <span>Lux</span>
    </div>
  );
};

export { IlluminanceStatus };
