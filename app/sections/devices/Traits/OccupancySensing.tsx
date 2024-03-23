import { SensorOccupied } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { SectionTitle } from "./elements/SectionTitle";

interface IOccupancySensingProps {
  sid: string;
  occupancy: boolean;
  showTitle?: boolean;
}

const OccupancySensing: React.FC<IOccupancySensingProps> = (
  props: IOccupancySensingProps,
) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <SectionTitle title="Obecność" show={props.showTitle} />
      <SensorOccupied color={props.occupancy ? "secondary" : "primary"} />
    </Box>
  );
};

export { OccupancySensing };
