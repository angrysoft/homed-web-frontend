"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSendEvent } from "../hooks/useSendEvent";
import { IDevicesContext, IEventData } from "./DeviceInfo";
import { getMainState } from "./utils";

interface IProviderProps {
  children: React.ReactNode;
}

const DeviceProvider = (props: IProviderProps) => {
  const send = useSendEvent();
  const [deviceState, setDeviceState] = useState<IDevicesContext | null>(null);

  const sse = useCallback(() => {
    const evSource = new EventSource(
      "http://localhost:8080/api/v1/devices/events",
      { withCredentials: true },
    );

    evSource.onmessage = async (event) => {
      if (!event.data.startsWith("{")) return;
      const eventData: IEventData = JSON.parse(event.data) || {};
      const { sid, payload } = eventData;
      if (!sid) return;
      if (sid === "deviceManager") {
        setDeviceState(getMainState(payload.deviceList) ?? null);
      } else {
        console.log("update: ", sid, payload);

        setDeviceState((deviceState: any) => {
          return {
            ...deviceState,
            devices: {
              ...deviceState?.devices,
              [sid]: {
                ...deviceState?.devices[sid],
                ...payload,
              },
            },
          };
        });
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

  useEffect(() => sse(), [sse]);

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
