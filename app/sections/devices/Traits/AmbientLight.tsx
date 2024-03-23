import { Box } from "@mui/material";
import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";
import { SectionTitle } from "./elements/SectionTitle";

interface IOnOffProps {
  sid: string;
  power: string;
  showTitle?: boolean
}

const AmbientLight: React.FC<IOnOffProps> = (props: IOnOffProps) => {
  const send = useSendCmd();
  const status = props?.power?.toLowerCase();

  return (
    <Box sx={{
      display: "flex",
      padding: "1rem",
      justifyContent: "space-between",
      alignItems: "center"
    }}
    >
      <SectionTitle show={props.showTitle} title="Ambient Light" />
      <PowerButton
        handleClick={() =>
          send(props.sid, "ambientLightState", status !== "on")
        }
        status={status === "on"}
      />
    </Box>
  );
};

export { AmbientLight };
