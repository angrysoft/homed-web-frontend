import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";

interface IDoubleSwitchProps {
  sid: string;
  left: string;
  right: string;
}

const DoubleSwitch: React.FC<IDoubleSwitchProps> = (
  props: IDoubleSwitchProps,
) => {
  const send = useSendCmd();

  return (
    <div className="grid grid-flow-col gap-1 items-center text-secondary">
      <PowerButton
        handleClick={() =>
          send(props.sid, "left", props.left.toLowerCase() !== "on")
        }
        status={props?.left?.toLowerCase() === "on"}
      />

      <PowerButton
        handleClick={() =>
          send(props.sid, "right", props.right.toLowerCase() !== "on")
        }
        status={props?.right?.toLowerCase() === "on"}
      />
    </div>
  );
};

export { DoubleSwitch };
