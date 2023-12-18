"use client";
import { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSendEvent } from "../hooks/useSendEvent";
import { IDevices, IDevicesContext, IEventData } from "./DeviceInfo";
import { devicesReducer } from "./devicesReducer";
import { parseDeviceEvent } from "./utils";

interface IProviderProps {
  children: React.ReactNode;
}

const DeviceProvider = (props: IProviderProps) => {
  const send = useSendEvent();
  const [deviceStorage, setDevicesStorage] = useLocalStorage<IDevices>(
    "devices",
    {},
  );
  const [placeStorage, setPlaceStorage] = useLocalStorage<string[]>(
    "places",
    [],
  );
  const [state, dispatch] = useReducer(devicesReducer, deviceStorage);

  useEffect(() => {
    setDevicesStorage(state);
  }, [setDevicesStorage, state]);

  useEffect(() => {
    console.log("init event source");
    const evSource = new EventSource("http://localhost:8080/devices/events");
    evSource.onmessage = async (event) => {
      if (!event.data.startsWith("{")) return;
      const eventData: IEventData = JSON.parse(event.data) || {};
      const sid = eventData.sid;
      if (!sid) return;

      if (sid === "deviceManager") {
        const deviceData = parseDeviceEvent(eventData.payload.deviceList);
        setPlaceStorage(deviceData?.places ?? []);
        dispatch({ type: "DEVICES_LOADED", payload: deviceData?.devices });
        return;
      }
      dispatch({ type: "UPDATE_DEVICE", payload: eventData });
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
  }, [send, setPlaceStorage]);

  return (
    <DeviceContext.Provider
      value={{ devices: deviceStorage, places: placeStorage }}
    >
      {props.children}
    </DeviceContext.Provider>
  );
};

const DeviceContext = createContext<IDevicesContext | null>(null);

export { DeviceContext, DeviceProvider };
export type { IDevices, IDevicesContext };
