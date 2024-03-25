"use client";
import { Favorite } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { BackButton } from "../../components/BackButton";
import MainLoader from "../../components/MainLoader";
import { DeviceContext } from "../../context/deviceContext";
import { useFavorites } from "../../hooks/useFavorites";
import { TraitsFactory } from "../../sections/devices/TraitsFactory";

const DeviceDetails = ({ params }: { params: { sid: string } }) => {
  const searchParams = useSearchParams();
  const deviceState = use(DeviceContext);
  const { favorites, toggleFavorite } = useFavorites();
  if (!deviceState) return <MainLoader />;
  const devInfo = deviceState.devices[params.sid];

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
          <BackButton href={searchParams.get("back") ?? "/"} />
        </Grid>
        <Grid xs={8}>
          <Typography textAlign={"center"}>{devInfo.name}</Typography>
        </Grid>
        <Grid xs={2} textAlign={"center"}>
          <IconButton onClick={() => toggleFavorite(params.sid)}>
            <Favorite
              color={favorites.includes(params.sid) ? "secondary" : "primary"}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Stack spacing={1} p={2}>
        {devInfo.traits.map((traitName) => (
          <TraitsFactory key={traitName} trait={traitName} info={devInfo} />
        ))}
      </Stack>
    </Stack>
  );
};

export default DeviceDetails;
