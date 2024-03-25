"use client";
import { Favorite } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { BackButton } from "../components/BackButton";
import { useFavorites } from "../hooks/useFavorites";
import { Devices } from "../sections/devices/Devices";
import { DeviceContext } from "../context/deviceContext";
import { use } from "react";
import { DeviceInfo } from "../context/DeviceInfo";

export default function FavoriteSection() {
  const deviceState = use(DeviceContext);
  const { favorites } = useFavorites();
  const devices: DeviceInfo[] = [];

  for (const sid of favorites) {
    if (deviceState?.devices && sid in deviceState.devices) {
      devices.push(deviceState.devices[sid]);
    }
  }

  return (
    <Stack spacing={2}>
      <Grid
        container
        component={"header"}
        borderBottom={1}
        borderColor="divider"
        p={2}
        alignItems={"center"}
      >
        <Grid xs={2}>
          <BackButton href="/" />
        </Grid>
        <Grid xs={8}>
          <Typography textAlign={"center"}>Ulubione</Typography>
        </Grid>
        <Grid xs={2} textAlign={"center"}>
          <Favorite color="primary" />
        </Grid>
      </Grid>
      <Devices items={devices} />
    </Stack>
  );
}
