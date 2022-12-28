import React, { useCallback, useEffect, useRef } from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { useSendCmd } from "../../hooks/useSendCmd";

interface IRgbProps {
  sid: string;
  rgb: number;
}

const Rgb: React.FC<IRgbProps> = (props: IRgbProps) => {
  const send = useSendCmd();
  const inColor = useRef<HTMLInputElement>(null);

  const rgbIntToHex = (rgb: string) => {
    let rgbInt = parseInt(rgb);
    let b = rgbInt & 255;
    let g = (rgbInt >> 8) & 255;
    let r = (rgbInt >> 16) & 255;
    console.log(
      r,
      g,
      b,
      `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
        .toString(16)
        .padStart(2, "0")}`,
    );
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const hexToRgbInt = (hexColor: string) => {
    return parseInt(hexColor.substr(1), 16).toString();
  };

  const handleChange = useCallback(() => {
    send(props.sid, "set_color", hexToRgbInt(inColor.current?.value || "#fff"));
  }, [inColor, props.sid, send]);

  useEffect(() => {
    inColor.current?.addEventListener("change", handleChange);
  }, [inColor, handleChange]);

  useEffect(() => {
    if (inColor.current)
      inColor.current.value = rgbIntToHex(props.rgb.toString());
  }, [props.rgb]);

  return (
    <div className="grid bg-surface p-1 w-full rounded-xl">
      <div className="grid grid-cols-5 items-center text-secondary">
        <MaterialSymbols name="palette" />
        <input
          type="color"
          className="col-span-4 w-full h-4 rounded-xl cursor-pointer border-primary border-2"
          ref={inColor}
        />
      </div>
    </div>
  );
};

export { Rgb };
