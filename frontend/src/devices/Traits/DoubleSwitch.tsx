import React from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { useSendCmd } from "../../hooks/useSendCmd";
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
    <div className="grid bg-surface p-1 w-full rounded-xl">
      <div className="grid gap-1 grid-cols-5 items-center text-secondary">
        <MaterialSymbols name="bolt" />
        <PowerButton
          handleClick={() =>
            send(props.sid, "left", !(props.left.toLowerCase() === "on"))
          }
          status={props.left.toLowerCase() === "on"}
        />

        <PowerButton
          handleClick={() =>
            send(props.sid, "right", !(props.right.toLowerCase() === "on"))
          }
          status={props.right.toLowerCase() === "on"}
        />
      </div>
    </div>
  );
};

export { DoubleSwitch };
