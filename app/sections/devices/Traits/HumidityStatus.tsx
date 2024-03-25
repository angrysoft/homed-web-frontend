import { Box, Typography } from "@mui/material";
import React from "react";
import { MaterialSymbols } from "../../../components/MaterialSymbols";
import { SectionTitle } from "./elements/SectionTitle";

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
      color={"primary"}
    >
      <MaterialSymbols name="humidity_percentage" sx={{
        color: "primary.main"
      }} />
      <SectionTitle title="Wilgotność" show={props.showTitle} />
      <Typography color="primary">{Math.round(props.humidity)} %</Typography>
    </Box>
  );
};

export { HumidityStatus };
