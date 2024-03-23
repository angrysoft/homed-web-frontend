import { MeetingRoomOutlined, SensorDoorOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { SectionTitle } from "./elements/SectionTitle";

interface IContactProps {
  sid: string;
  contact: boolean;
  showTitle?: boolean;
}

const Contact: React.FC<IContactProps> = (props: IContactProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      {props.contact ? (
        <>
          <SectionTitle title="Zamkniete" show={props.showTitle} />
          <SensorDoorOutlined color="primary" />
        </>
      ) : (
        <>
          <SectionTitle title="Otwarte" show={props.showTitle} />
          <MeetingRoomOutlined color="secondary" />
        </>
      )}
    </Box>
  );
};

export { Contact };
