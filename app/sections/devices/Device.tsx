"use client";
import { Box, Button, Icon, Paper, Stack } from "@mui/material";
import React from "react";
import { DeviceInfo } from "../../context/DeviceInfo";
import { getLangCode } from "../../context/utils";
import { TraitsFactory } from "./TraitsFactory";

interface IDeviceProps {
  info: DeviceInfo;
}

const Device: React.FC<IDeviceProps> = (props: IDeviceProps) => {
  const lang: string = getLangCode(navigator.language);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
      elevation={2}
    >
      <Button
        href={`/device/${props.info.place[lang]}/${props.info.sid}`}
        startIcon={<Icon>{props.info.icon ?? "sensors"}</Icon>}
      >
        {props.info.name[lang]}
      </Button>
      <Stack direction={"column"}>
        {props.info.traits.map((traitName: string) => (
          <Box key={traitName}>
            <TraitsFactory trait={traitName} info={props.info} main />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export { Device };
