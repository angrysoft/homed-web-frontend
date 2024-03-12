import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";

interface ISingleSwitchProps {
  sid: string;
  outlet: string;
}

const SingleSwitch: React.FC<ISingleSwitchProps> = (
  props: ISingleSwitchProps,
) => {
  const send = useSendCmd();

  return (
    <div className="grid grid-flow-col gap-1 items-center text-secondary">
      <PowerButton
        handleClick={() =>
          send(props.sid, "outlet", props.outlet.toLowerCase() !== "on")
        }
        status={props?.outlet?.toLowerCase() === "on"}
      />
    </div>
  );
};

export { SingleSwitch };
