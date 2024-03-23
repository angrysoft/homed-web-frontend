import { Thermostat } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { SectionTitle } from "./elements/SectionTitle";

interface ITemperatureStatusProps {
  sid: string;
  temperature: number;
  showTitle?: boolean;
}

const TemperatureStatus: React.FC<ITemperatureStatusProps> = (
  props: ITemperatureStatusProps,
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
      <Thermostat color="primary" />
      <SectionTitle title="Temperatura" show={props.showTitle} />
      <Typography color="primary">
        {Math.round(props.temperature)} &#8451;
      </Typography>
    </Box>
  );
};

export { TemperatureStatus };
