'use client'
import Grid from "@mui/material/Unstable_Grid2";
import { BackButton } from "../components/BackButton";
import { Typography, Stack } from "@mui/material";
import { Favorite } from "@mui/icons-material";

export default function User() {
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
          <Typography textAlign={"center"}>Użytkownik</Typography>
        </Grid>
        <Grid xs={2} textAlign={"center"}>
          <Favorite color="primary" />
        </Grid>
      </Grid>
    </Stack>
  );
}
