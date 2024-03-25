import { Box, Tab, Tabs } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { DeviceContext, IDevicesContext } from "../../context/deviceContext";
import { Devices } from "../devices/Devices";
import { TabPanel } from "./TabPanel";

export function Places() {
  const deviceState = useContext(DeviceContext);
  const [place, setPlace] = useState<string | false>(false);

  useEffect(() => {
    const savedPlace = localStorage.getItem("place");
    if (savedPlace) setPlace(savedPlace);
  }, []);

  const handlePlaceChange = useCallback(
    (event: React.SyntheticEvent, placeName: string) => {
      setPlace(placeName);
      localStorage.setItem("place", placeName);
    },
    [setPlace],
  );

  const parseData = useCallback(
    (state: IDevicesContext | null): [React.JSX.Element[], React.JSX.Element[]] => {
      if (!state) return [[], []];
      const _places: React.JSX.Element[] = [];
      const _devices: React.JSX.Element[] = [];

      for (const placeName of state.places ?? []) {
        _places.push(
          <Tab key={`tab-${placeName}`} label={placeName} value={placeName} />,
        );

        const devicesInPlace = [];

        for (const dev of Object.values(state.devices) ?? []) {
          if (dev.place === placeName) devicesInPlace.push(dev);
        }
        if (devicesInPlace.length > 0) {
          _devices.push(
            <TabPanel key={placeName} value={place || ""} index={placeName}>
              <Devices items={devicesInPlace} />
            </TabPanel>,
          );
        }
      }

      return [_places, _devices];
    },
    [place],
  );

  const [places, devices] = useMemo(
    () => parseData(deviceState),
    [deviceState, parseData],
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box borderBottom={1} borderColor={"divider"}>
        <Tabs
          value={place}
          onChange={handlePlaceChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            paddingTop: "1rem",
          }}
        >
          {places}
        </Tabs>
      </Box>
      {devices}
    </Box>
  );
}
