import { Box } from "@mui/material";
import React from "react";
import { MaterialSymbols } from "../../../components/MaterialSymbols";
import { SectionTitle } from "./elements/SectionTitle";

interface IContactProps {
  sid: string;
  contact: boolean;
  showTitle?: boolean;
}

const Contact: React.FC<IContactProps> = (props: IContactProps) => {
  let title = "Zamkniete";
  let color = "primary.main";
  let icon = "door_front";
  if (!props.contact) {
    title = "Otwarte";
    color = "secondary.main";
    icon = "door_open";
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <SectionTitle title={title} show={props.showTitle} />
      <MaterialSymbols
        name={icon}
        sx={{
          color: color,
        }}
      />
    </Box>
  );
};

export { Contact };
