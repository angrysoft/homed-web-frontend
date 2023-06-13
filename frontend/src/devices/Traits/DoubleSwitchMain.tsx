import React from "react";
import { useSendCmd } from "../../hooks/useSendCmd";
import { TraitIcon } from "./TraitIcon";

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
      <div
        onClick={() =>
          send(props.sid, "left", !(props.left.toLowerCase() === "on"))
        }
      >
        <TraitIcon
          name="power_rounded"
          status={(props.left || "").toLowerCase() === "on"}
        />
      </div>
      <div
        onClick={() =>
          send(
            props.sid,
            "right",
            !(props.right.toLowerCase() === "on"),
          )
        }
      >
        <TraitIcon
          name="power_rounded"
          status={(props.right || "").toLowerCase() === "on"}
        />
      </div>
    </div>
  );
};

export { DoubleSwitchMain };
