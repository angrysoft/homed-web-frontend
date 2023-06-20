import React from "react";
import { useSendCmd } from "../../hooks/useSendCmd";
import PowerButtonSmall from "./elements/PowerButtonSmall";

interface IOnOffMainProps {
  sid: string;
  power: string;
}

const OnOffMain: React.FC<IOnOffMainProps> = (props: IOnOffMainProps) => {
  const send = useSendCmd();

  return (
    <div className="grid justify-end">
      <PowerButtonSmall
        status={props.power === "on"}
        handleClick={() =>
          send(props.sid, props.power === "on" ? "off" : "on", null)
        }
      />
    </div>
  );
};

export { OnOffMain };
