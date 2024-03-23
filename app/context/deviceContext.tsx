"use client";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useSendEvent } from "../hooks/useSendEvent";
import { IDevicesContext, IEventData } from "./DeviceInfo";
import { parseDeviceEvent } from "./utils";

interface IProviderProps {
  children: React.ReactNode;
}

const DeviceProvider = (props: IProviderProps) => {
  const send = useSendEvent();
  const [deviceState, setDeviceState] = useState<IDevicesContext>({});

  const sse = useCallback(() => {
    const evSource = new EventSource(
      "http://localhost:8080/api/v1/devices/events",
      { withCredentials: true },
    );

    evSource.onmessage = async (event) => {
      if (!event.data.startsWith("{")) return;
      const eventData: IEventData = JSON.parse(event.data) || {};
      const {sid, payload} = eventData;
      if (!sid) return;
      if (sid === "deviceManager") {
        console.log("devicesLoaded", parseDeviceEvent(eventData.payload.deviceList));
        setDeviceState(parseDeviceEvent(payload.deviceList) ?? {});
      } else {
        // dispatch({ type: "UPDATE_DEVICE", payload: eventData });
        console.log("update: ",sid,  payload);
        // setDeviceState(deviceState=> {
        //   return {...deviceState, ...deviceState[payload.place["pl"]]}
        // })
      }
    };

    evSource.onopen = async (ev) => {
      send({
        event: "request",
        sid: "deviceManager",
        payload: {
          name: "devices",
          value: "list",
        },
      });
    };

    evSource.onerror = () => {
      evSource.close();
    };
    return () => {
      evSource.close();
    };
  }, [send]);

  useEffect(()=> sse(), []);

  const deviceContextValue = useMemo(() => deviceState, [deviceState]);

  return (
    <DeviceContext.Provider value={deviceContextValue}>
      {props.children}
    </DeviceContext.Provider>
  );
};

const DeviceContext = createContext<IDevicesContext | null>(null);

export { DeviceContext, DeviceProvider };
export type { IDevicesContext };
