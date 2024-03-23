import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";
import { SectionTitle } from "./elements/SectionTitle";
import { Box } from "@mui/material";

interface IOnOffProps {
  sid: string;
  power: string;
  showTitle?: boolean
}

const OnOff: React.FC<IOnOffProps> = (props: IOnOffProps) => {
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
      <SectionTitle show={props.showTitle} title="Włącznik" />
      <PowerButton
        handleClick={() =>
          send(props.sid, status === "on" ? "off" : "on", null)
        }
        status={status === "on"}
      />
    </Box>
  );
};

export { OnOff };
