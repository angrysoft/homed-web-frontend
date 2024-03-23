import React from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { PowerButton } from "./elements/PowerButton";
import { SectionTitle } from "./elements/SectionTitle";
import { Box } from "@mui/material";

interface ISingleSwitchProps {
  sid: string;
  outlet: string;
  showTitle?: boolean;
}

const SingleSwitch: React.FC<ISingleSwitchProps> = (
  props: ISingleSwitchProps,
) => {
  const send = useSendCmd();

  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SectionTitle show={props.showTitle} title="Włącznik" />
      <PowerButton
        handleClick={() =>
          send(props.sid, "outlet", props.outlet.toLowerCase() !== "on")
        }
        status={props?.outlet?.toLowerCase() === "on"}
      />
    </Box>
  );
};

export { SingleSwitch };
