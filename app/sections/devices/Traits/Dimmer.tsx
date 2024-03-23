import { LightMode } from "@mui/icons-material";
import { Box, Slider, SliderProps, styled } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSendCmd } from "../../../hooks/useSendCmd";

interface IDimmerProps {
  sid: string;
  bright: number;
}

const DimmerSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  height: "1.5rem",
  ".MuiSlider-track": {
    background: "transparent",
    border: "none",
  },
  ".MuiSlider-rail": {
    opacity: "1",
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  ".MuiSlider-thumb": {
    height: "2rem",
    width: "2rem",
  },
}));

const Dimmer: React.FC<IDimmerProps> = (props: IDimmerProps) => {
  const send = useSendCmd();
  const [bright, setBright] = useState(props.bright);

  const handleChange = useCallback(
    (event: React.SyntheticEvent | Event, value: number | number[]) => {
      if (typeof value === "number") {
        setBright(value);
      }
    },
    [],
  );

  const sendCommand = useCallback(
    (event: React.SyntheticEvent | Event, value: number | number[]) => {
      if (typeof value === "number") {
        send(props.sid, "setBright", value);
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
      <LightMode color="primary" fontSize="large" />
      <DimmerSlider
        step={1}
        min={1}
        max={100}
        value={bright}
        onChange={handleChange}
        onChangeCommitted={sendCommand}
      />
    </Box>
  );
};

export { Dimmer };
