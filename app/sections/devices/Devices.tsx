import { Box } from "@mui/material";
import React from "react";
import { DeviceInfo } from "../../context/DeviceInfo";
import { Device } from "./Device";

interface IDevicesProps {
  items: DeviceInfo[];
}

const Devices: React.FC<IDevicesProps> = (props: IDevicesProps) => {
  return (
    <Box
      component="section"
      display="flex"
      gap="1rem"
      sx={{
        flexDirection: {
          xs: "column",
          md: "row",
        },
        flexWrap: { md: "wrap" },
      }}
    >
      {props.items.map((dev, index) => {
        return <Device key={dev.sid} info={dev} />;
      })}
    </Box>
  );
};

export { Devices };
