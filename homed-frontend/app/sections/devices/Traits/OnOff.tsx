import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";

interface IOnOffProps {
  sid: string;
  power: string;
}

const OnOff: React.FC<IOnOffProps> = (props: IOnOffProps) => {
  const send = useSendCmd();

  return (
      <div className="grid grid-cols-2 text-secondary">
        <PowerButton
          handleClick={() =>
            send(props.sid, props.power === "on" ? "off" : "on", null)
          }
          status={props.power === "on"}
        />
      </div>
  );
};

export { OnOff };
