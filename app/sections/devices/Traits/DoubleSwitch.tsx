import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";
import { SectionTitle } from "./elements/SectionTitle";

interface IDoubleSwitchProps {
  sid: string;
  outlet0: string;
  outlet1: string;
  showTitle?: boolean;
}

const DoubleSwitch: React.FC<IDoubleSwitchProps> = (
  props: IDoubleSwitchProps,
) => {
  const send = useSendCmd();

  return (
    <div className="grid grid-flow-col gap-1 items-center text-secondary">
      <SectionTitle show={props.showTitle} title="Switches" />
      <PowerButton
        handleClick={() =>
          send(props.sid, "outlet0", props.outlet0.toLowerCase() !== "on")
        }
        status={props?.outlet0?.toLowerCase() === "on"}
      />

      <PowerButton
        handleClick={() =>
          send(props.sid, "outlet1", props.outlet1.toLowerCase() !== "on")
        }
        status={props?.outlet1?.toLowerCase() === "on"}
      />
    </div>
  );
};

export { DoubleSwitch };
