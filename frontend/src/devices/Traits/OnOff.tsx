import React from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { useSendCmd } from "../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButthon";
import { TraitIcon } from "./TraitIcon";

interface IOnOffProps {
  sid: string;
  power: string;
}

const OnOff: React.FC<IOnOffProps> = (props: IOnOffProps) => {
  const send = useSendCmd();

  return (
    <div className="grid bg-surface p-1 w-full rounded-xl">
      <div className="grid grid-cols-5 items-center text-secondary">
        <MaterialSymbols name="bolt" />
        <PowerButton handleClick={() =>
            send(props.sid, "power", props.power === "on" ? "off" : "on")
          }
          status={props.power === "on" ? true : false}
        />
      </div>
    </div>
  );
};

export { OnOff };
