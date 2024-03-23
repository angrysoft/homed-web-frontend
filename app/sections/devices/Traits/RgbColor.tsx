import React, { useCallback, useEffect, useRef } from "react";
import { MaterialSymbols } from "../../../components/MaterialSymbols";
import { useSendCmd } from "../../../hooks/useSendCmd";
import { Palette } from "@mui/icons-material";
import { Box } from "@mui/material";

interface IRgbColorProps {
  sid: string;
  rgb: number;
}

const RgbColor: React.FC<IRgbColorProps> = (props: IRgbColorProps) => {
  const send = useSendCmd();
  const inColor = useRef<HTMLInputElement>(null);

  const rgbIntToHex = (rgb: string) => {
    let rgbInt = parseInt(rgb);
    let b = rgbInt & 255;
    let g = (rgbInt >> 8) & 255;
    let r = (rgbInt >> 16) & 255;
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const hexToRgbInt = (hexColor: string) => {
    return parseInt(hexColor.substr(1), 16);
  };

  const handleChange = useCallback(() => {
    send(props.sid, "setColor", hexToRgbInt(inColor.current?.value || "#fff"));
  }, [inColor, props.sid, send]);

  useEffect(() => {
    inColor.current?.addEventListener("change", handleChange);
  }, [inColor, handleChange]);

  useEffect(() => {
    if (inColor.current)
      inColor.current.value = rgbIntToHex(props.rgb.toString());
  }, [props.rgb]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Palette color="primary" />
      <input
        type="color"
        style={{
          height: "3rem",
          width: "100%",
          outline: "none",
          border: "none",
          padding: 0,
          background: "transparent",
        }}
        className="col-span-4 w-full h-4 rounded-xl cursor-pointer border-primary border-2"
        ref={inColor}
      />
    </Box>
  );
};

export { RgbColor };
