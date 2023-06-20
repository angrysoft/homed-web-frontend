import React from "react";
import { useSendCmd } from "../../hooks/useSendCmd";
import PowerButtonSmall from "./elements/PowerButtonSmall";

interface IDoubleSwitchMainProps {
  sid: string;
  left: string;
  right: string;
}

const DoubleSwitchMain: React.FC<IDoubleSwitchMainProps> = (
  props: IDoubleSwitchMainProps,
) => {
  const send = useSendCmd();
  return (
    <div className="grid grid-flow-col justify-end gap-x-2">
      <PowerButtonSmall
        handleClick={() =>
          send(props.sid, "left", !(props.left.toLowerCase() === "on"))
        }
        status={(props.left || "").toLowerCase() === "on"}
      />
      <PowerButtonSmall
        handleClick={() =>
          send(props.sid, "right", !(props.right.toLowerCase() === "on"))
        }
        status={(props.right || "").toLowerCase() === "on"}
      />
    </div>
  );
};

export { DoubleSwitchMain };
