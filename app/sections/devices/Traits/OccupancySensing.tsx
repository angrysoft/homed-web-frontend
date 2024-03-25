import { Box } from "@mui/material";
import React from "react";
import { MaterialSymbols } from "../../../components/MaterialSymbols";
import { SectionTitle } from "./elements/SectionTitle";

interface IOccupancySensingProps {
  sid: string;
  occupancy: boolean;
  showTitle?: boolean;
}

const OccupancySensing: React.FC<IOccupancySensingProps> = (
  props: IOccupancySensingProps,
) => {
  let icon = "motion_sensor_active";
  let color = "primary.main";
  if (props.occupancy) {
    icon = "sensor_occupied";
    color = "secondary.main";
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
      {props.showTitle && (
        <MaterialSymbols
          name={"motion_sensor_alert"}
          sx={{
            color: "primary.main",
          }}
        />
      )}
      <SectionTitle title="Obecność" show={props.showTitle} />
      <MaterialSymbols
        name={icon}
        sx={{
          color: color,
        }}
      />
    </Box>
  );
};

export { OccupancySensing };
