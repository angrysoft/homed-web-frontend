import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";
import { SectionTitle } from "./elements/SectionTitle";

interface IOnOffProps {
  sid: string;
  power: string;
}

const AmbientLight: React.FC<IOnOffProps> = (props: IOnOffProps) => {
  const send = useSendCmd();
  const status = props?.power?.toLowerCase();

  return (
    <div className="grid gap-1 text-secondary">
      <SectionTitle show title="Ambient Light" />
      <PowerButton
        handleClick={() =>
          send(props.sid, "ambientLightState", status !== "on")
        }
        status={status === "on"}
      />
    </div>
  );
};

export { AmbientLight };
