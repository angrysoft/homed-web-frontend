'use client'
import { Stack, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { BackButton } from "../components/BackButton";

export default function SettingsSection() {
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
          <Typography textAlign={"center"}>Ustawienia</Typography>
        </Grid>
        <Grid xs={2} textAlign={"center"}>
          <Settings color="primary" />
        </Grid>
      </Grid>
      <Stack spacing={2} p={2} useFlexGap>
      </Stack>
    </Stack>
  )
}