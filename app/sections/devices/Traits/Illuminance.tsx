import { LightMode } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { SectionTitle } from "./elements/SectionTitle";

interface IIlluminanceStatusProps {
  sid: string;
  lux: number;
  showTitle?: boolean;
}

const IlluminanceStatus: React.FC<IIlluminanceStatusProps> = (
  props: IIlluminanceStatusProps,
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
      <LightMode color="primary" />
      <SectionTitle title="Natężenie oświetlenia" show={props.showTitle} />
      <Typography color="primary">{Math.round(props.lux)} Lux</Typography>
    </Box>
  );
};

export { IlluminanceStatus };
