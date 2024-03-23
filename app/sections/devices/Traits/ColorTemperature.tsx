import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { WbIridescent } from "@mui/icons-material";
import { Box, Paper, Slider, SliderProps, Stack, styled } from "@mui/material";

interface IColorTemperatureProps {
  sid: string;
  ct: number;
}

const ColorTempSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  height: "1.5rem",
  ".MuiSlider-track": {
    background: "transparent",
    border: "none",
  },
  ".MuiSlider-rail": {
    opacity: "1",
    background:
      "linear-gradient(90deg, rgba(255,119,0,1) 0%, rgba(240,241,8,1) 50%, rgba(255,255,255,1) 100%)",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  ".MuiSlider-thumb": {
    height: "2rem",
    width: "2rem",
  },
}));

const ColorTemperature: React.FC<IColorTemperatureProps> = (
  props: IColorTemperatureProps,
) => {
  const send = useSendCmd();
  const [ctPc, setCtPc] = useState(props.ct);

  const handleChange = useCallback(
    (event: React.SyntheticEvent | Event, value: number | number[]) => {
      if (typeof value === "number") {
        setCtPc(value);
      }
    },
    [],
  );

  const sendCommand = useCallback(
    (event: React.SyntheticEvent | Event, value: number | number[]) => {
      if (typeof value === "number") {
        send(props.sid, "setCtPc", value);
      }
    },
    [props.sid, send],
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <WbIridescent color="primary" fontSize="large" />
      <ColorTempSlider
        step={1}
        min={1}
        max={100}
        value={ctPc}
        onChange={handleChange}
        onChangeCommitted={sendCommand}
      />
    </Box>
  );
};

export { ColorTemperature };
