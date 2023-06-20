import React from "react";
import { TraitIcon } from "./TraitIcon";

interface IContactProps {
  sid: string;
  contact: boolean;
}

const Contact: React.FC<IContactProps> = (props: IContactProps) => {
  return (
    <div className="grid text-secondary justify-self-center items-center">
      <TraitIcon
        name={props.contact ? "door_front" : "door_open"}
        status={!props.contact}
      />
    </div>
  );
};

export { Contact };
