import { Box, Icon, Typography } from "@mui/material";
import React from "react";
import { SectionTitle } from "./elements/SectionTitle";
import { Opacity } from "@mui/icons-material";

interface IHumidityStatusProps {
  sid: string;
  humidity: number;
  showTitle: boolean;
}

const HumidityStatus: React.FC<IHumidityStatusProps> = (
  props: IHumidityStatusProps,
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
      <Opacity color="primary"/>
      <SectionTitle title="Wilgotność" show={props.showTitle} />
      <Typography color="primary">{Math.round(props.humidity)} %</Typography>
    </Box>
  );
};

export { HumidityStatus };
