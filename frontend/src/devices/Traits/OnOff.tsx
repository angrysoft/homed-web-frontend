import React from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { useSendCmd } from "../../hooks/useSendCmd";
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
        <div
          className="col-span-2 grid items-center p-05 justify-center border-primary border-2 rounded-xl"
          onClick={() =>
            send(props.sid, "power", props.power === "on" ? "off" : "on")
          }
        >

          <TraitIcon
            name="power_rounded"
            status={props.power === "on" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export { OnOff };
