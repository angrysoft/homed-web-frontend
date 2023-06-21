import React, { useCallback, useEffect, useRef } from "react";
import { MaterialSymbols } from "../../components/MaterialSymbols";
import { useSendCmd } from "../../hooks/useSendCmd";

interface IDimmerProps {
  sid: string;
  bright: number;
}

const Dimmer: React.FC<IDimmerProps> = (props: IDimmerProps) => {
  const send = useSendCmd();
  const inBright = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(() => {
    send(props.sid, "setBright", Number(inBright.current?.value));
  }, [inBright, props.sid, send]);

  useEffect(() => {
    inBright.current?.addEventListener("change", handleChange);
    return inBright.current?.removeEventListener("change", handleChange);
  }, [inBright, handleChange]);

  useEffect(() => {
    if (inBright.current) inBright.current.value = props.bright.toString();
  }, [props.bright]);

  return (
    <div className="grid grid-cols-5 items-center text-secondary">
      <MaterialSymbols name="light_mode" />
      <input
        type="range"
        className="col-span-4 w-full p-0 rounded-xl appearance-none cursor-pointer bg-gradient-to-r from-black to-white border-primary border-2"
        step="1"
        min="1"
        max="100"
        ref={inBright}
      />
    </div>
  );
};

export { Dimmer };
