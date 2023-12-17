"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "../store";
import { useSendEvent } from "./useSendEvent";

const useEvents = () => {
  const { dispatch } = useContext(AppContext);
  const send = useSendEvent();

  useEffect(() => {
    console.log("init event source");
    const evSource = new EventSource("http://localhost:8080/devices/events");
    evSource.onmessage = async (event) => {
      if (!event.data.startsWith("{")) return;
      const eventData = JSON.parse(event.data);
      if (eventData.sid === "deviceManager") {
        dispatch({
          type: "REFRESH_NEEDED_TRUE",
          payload: eventData.payload.deviceList || [],
        });
      } else {
        console.log(event.data);
        dispatch({ type: "UPDATE_DEVICE", payload: eventData });
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
  }, [dispatch, send]);
};

export { useEvents };
