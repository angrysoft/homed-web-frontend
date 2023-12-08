import React, { useCallback, useEffect, useRef } from "react";
import { MaterialSymbols } from "../../../components/MaterialSymbols";
import { useSendCmd } from "../../../hooks/useSendCmd";

interface IColorTemperatureProps {
  sid: string;
  ct: number;
}

const ColorTemperature: React.FC<IColorTemperatureProps> = (
  props: IColorTemperatureProps,
) => {
  const send = useSendCmd();
  const inCt = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(() => {
    send(props.sid, "setCtPc", Number(inCt.current?.value));
  }, [inCt, props.sid, send]);

  useEffect(() => {
    inCt.current?.addEventListener("change", handleChange);
  }, [inCt, handleChange]);

  useEffect(() => {
    if (inCt.current) inCt.current.value = props.ct.toString();
  }, [props.ct]);

  return (
    <div className="grid grid-cols-5 items-center text-secondary">
      <MaterialSymbols name="wb_iridescent" />
      <input
        type="range"
        className="col-span-4 w-full p-0 rounded-xl appearance-none cursor-pointer bg-gradient-to-r from-orange-500 via-yellow-500 to-yellow-50 border-primary border-2"
        step="1"
        min="1"
        max="100"
        ref={inCt}
      />
    </div>
  );
};

export { ColorTemperature };
