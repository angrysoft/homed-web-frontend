"use client";
import { Box, Button, Paper, Stack } from "@mui/material";
import React from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { DeviceInfo } from "../../context/DeviceInfo";
import { TraitsFactory } from "./TraitsFactory";
import { useRouter } from "next/navigation";

interface IDeviceProps {
  info: DeviceInfo;
  back?: string
}

const Device: React.FC<IDeviceProps> = (props: IDeviceProps) => {
  const router = useRouter();

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
        size="small"
        startIcon={<MaterialSymbols name={props.info.icon ?? "sensors"} />}
        onClick={() => router.push(`/device/${props.info.sid}` + (props.back ? `?back=${props.back}` : ""))}
      >
        {props.info.name}
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
