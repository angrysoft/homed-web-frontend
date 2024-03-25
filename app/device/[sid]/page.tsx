"use client";
import { IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
import { BackButton } from "../../components/BackButton";
import MainLoader from "../../components/MainLoader";
import { DeviceContext } from "../../context/deviceContext";
import { TraitsFactory } from "../../sections/devices/TraitsFactory";
import { Favorite } from "@mui/icons-material";

interface IDeviceDetailsProps {
  sid: string;
}

const DeviceDetails = ({ params }: { params: { sid: string } }) => {
  const deviceState = useContext(DeviceContext);
  if (!deviceState) return <MainLoader />;
  const devInfo = deviceState.devices[params.sid];

  const toggleFavorite = (ev: React.SyntheticEvent) => {
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
          <Typography textAlign={"center"}>{devInfo.name}</Typography>
        </Grid>
        <Grid xs={2} textAlign={"center"}>
          <IconButton onClick={toggleFavorite}>
            <Favorite />
          </IconButton>
        </Grid>
      </Grid>
      <Stack spacing={1} p={2}>
        {devInfo.traits.map((traitName) => (
          <TraitsFactory key={traitName} trait={traitName} info={deviceState.devices[params.sid]} />
        ))}
      </Stack>
    </Stack>
  );
};

export default DeviceDetails;
