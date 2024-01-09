import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";

interface IDoubleSwitchProps {
  sid: string;
  one: string;
  two: string;
}

const DoubleSwitch: React.FC<IDoubleSwitchProps> = (
  props: IDoubleSwitchProps,
) => {
  const send = useSendCmd();

  return (
    <div className="grid grid-flow-col gap-1 items-center text-secondary">
      <PowerButton
        handleClick={() =>
          send(props.sid, "left", props.one.toLowerCase() !== "on")
        }
        status={props?.one?.toLowerCase() === "on"}
      />

      <PowerButton
        handleClick={() =>
          send(props.sid, "right", props.two.toLowerCase() !== "on")
        }
        status={props?.two?.toLowerCase() === "on"}
      />
    </div>
  );
};

export { DoubleSwitch };
