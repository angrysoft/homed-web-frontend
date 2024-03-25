import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DeviceContext, IDevicesContext } from "../../context/deviceContext";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "./TabPanel";
import { Devices } from "../devices/Devices";

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
    (state: IDevicesContext): [React.JSX.Element[], React.JSX.Element[]] => {
      if (!state) return [[], []];
      const _places: React.JSX.Element[] = [];
      const _devices: React.JSX.Element[] = [];
      for (const [placeName, deviceInfoList] of Object.entries(state ?? {})) {
        _places.push(
          <Tab key={`tab-${placeName}`} label={placeName} value={placeName}/>,
        );
        _devices.push(
          <TabPanel key={placeName} value={place || ""} index={placeName}>
            <Devices items={deviceInfoList} />
          </TabPanel>,
        );
      }

      return [_places, _devices];
    },
    [place],
  );

  const [places, devices] = useMemo(
    () => parseData(deviceState ?? {}),
    [deviceState, parseData],
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden"
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
