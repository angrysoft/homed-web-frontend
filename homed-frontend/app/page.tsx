"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import MainLoader from "./components/MainLoader";
import { Places } from "./sections/Places";
import { Devices } from "./sections/devices/Devices";
import { AppContext } from "./store";
import { DeviceInfo } from "./reducers/devicesReducer";

export default function Home() {
  const { state } = useContext(AppContext);
  const [place, setPlace] = useState("");
  const [devices, setDevices] = useState<[string, DeviceInfo][]>();
  
  const handlePlaceChange = useCallback((placeName: string) => {
    console.log(placeName);
    setPlace(placeName);
    setDevices(
      Object.entries(state.devices).filter(([sid, dev]) => {
        if (dev.place === place) {
          return true;
        }
        return false;
      }),
    );
  }, [place, state.devices]);

  useEffect(() => {
    handlePlaceChange(
      localStorage.getItem("placeSelected") ?? state.places.places[0] ?? "",
    );
  }, [handlePlaceChange, state.places.places]);
  

  if (state.main.loading) {
    return <MainLoader />;
  }


  return (
    <main className="grid content-baseline h-[100dvh]">
      <Places
        onChange={handlePlaceChange}
        items={state.places.places || []}
        selected={place}
      />
      <Devices deviceList={devices ?? []} />
    </main>
  );
}
