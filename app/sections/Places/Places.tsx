import { useCallback, useContext, useState } from "react";
import { DeviceContext } from "../../context/deviceContext";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "./TabPanel";

export function Places() {
  const state = useContext(DeviceContext);
  const [place, setPlace] = useState<string | false>(false);

  const handlePlaceChange = useCallback(
    (event: React.SyntheticEvent, placeName: string) => {
      console.log(placeName);
      setPlace(placeName);
    },
    [setPlace],
  );

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box borderBottom={1} borderColor={"divider"} p={1}>
        <Tabs
          value={place}
          onChange={handlePlaceChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {Object.keys(state?.devices ?? {}).map((_place) => {
            console.log("place in tab", _place);
            return <Tab key={_place} label={_place} value={_place} />;
          })}
        </Tabs>
      </Box>
      {Object.entries(state?.devices ?? {}).map(([_place, devices]) => {
        if (!_place) {
          console.log("place", place, _place);
          return null;
        }
        return (
          <TabPanel key={_place} value={place || ""} index={_place}>
            {place}
          </TabPanel>
        );
      })}
    </Box>
  );
}
