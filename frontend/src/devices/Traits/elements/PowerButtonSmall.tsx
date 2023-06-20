import * as React from "react";
import { TraitIcon } from "../TraitIcon";

interface IPowerButtonSmallProps {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  status: boolean;
}

const PowerButtonSmall: React.FunctionComponent<IPowerButtonSmallProps> = (
  props,
) => {
  return (
    <div onClick={props.handleClick}>
      <TraitIcon name="power_rounded" status={props.status} />
    </div>
  );
};

export default PowerButtonSmall;
