"use client";
import { Favorite } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { use } from "react";
import { BackButton } from "../components/BackButton";
import { DeviceInfo } from "../context/DeviceInfo";
import { DeviceContext } from "../context/deviceContext";
import { useFavorites } from "../hooks/useFavorites";
import { Device } from "../sections/devices/Device";

export default function FavoritesSection() {
  const deviceState = use(DeviceContext);
  const { favorites } = useFavorites();
  const devices: DeviceInfo[] = [];

  for (const sid of favorites) {
    if (deviceState?.devices && sid in deviceState.devices) {
      devices.push(deviceState.devices[sid]);
    }
  }

  return (
    <Stack spacing={2} useFlexGap>
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
      <Stack spacing={2} p={2} useFlexGap>
      {devices.map((dev) => {
        return <Device key={dev.sid} info={dev} back="/favorites" />;
      })}
      </Stack>
    </Stack>
  );
}
