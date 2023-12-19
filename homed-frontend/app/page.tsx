"use client";

import { useCallback, useContext } from "react";
import MainLoader from "./components/MainLoader";
import { DeviceContext } from "./context/deviceContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Places } from "./sections/Places";
import { Devices } from "./sections/devices/Devices";

export default function Home() {
  const state = useContext(DeviceContext);
  const [place, setPlace] = useLocalStorage("place", "");

  const handlePlaceChange = useCallback(
    (placeName: string) => {
      setPlace(placeName);
    },
    [setPlace],
  );

  if (
    Object.keys(state?.devices ?? {}).length === 0 ||
    state?.places.length === 0
  )
    return <MainLoader />;

  return (
    <main className="grid content-baseline h-[100dvh]">
      <Places
        onChange={handlePlaceChange}
        items={state?.places ?? []}
        selected={place}
      />
      <Devices devices={state?.devices ?? {}} selectedPlace={place} />
    </main>
  );
}
