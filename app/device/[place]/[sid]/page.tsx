"use client";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import MainLoader from "../../../components/MainLoader";
import { DeviceInfo } from "../../../context/DeviceInfo";
import { DeviceContext } from "../../../context/deviceContext";
import { getLangCode } from "../../../context/utils";
import { TraitsFactory } from "../../../sections/devices/TraitsFactory";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface IDeviceDetailsProps {
  sid: string;
}

const DeviceDetails = ({
  params,
}: {
  params: { place: string; sid: string };
}) => {
  const deviceState = useContext(DeviceContext);
  const lang = getLangCode(navigator.language);
  if (!deviceState) return <MainLoader />;

  const devInfo: DeviceInfo = (deviceState[params.place] ?? []).find(
    (dev) => dev.sid === params.sid,
  ) ?? {
    traits: [],
    name: {},
    place: {},
    model: "",
    sid: "",
  };

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
          <IconButton href={"/"}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid xs={8}>
          <Typography textAlign={"center"}>{devInfo.name[lang]}</Typography>
        </Grid>
      </Grid>
      <Stack spacing={1} p={2}>
        {devInfo.traits.map((traitName) => (
          <TraitsFactory
            key={traitName}
            trait={traitName}
            info={devInfo}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default DeviceDetails;
