"use client";

import { useCallback, useContext, useEffect } from "react";
import MainLoader from "./components/MainLoader";
import { DeviceContext } from "./context/deviceContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Places } from "./sections/Places";
import { Devices } from "./sections/devices/Devices";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, user] = useCheckAuth();
  const state = useContext(DeviceContext);
  const [place, setPlace] = useLocalStorage<{ placeName: string }>("place", {
    placeName: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
    }
  }, [loading, router, user]);

  useEffect(() => {
    if (place.placeName.length === 0) {
      const defaultPlace = state?.places.at(0);
      if (defaultPlace && defaultPlace.length !== 0)
        setPlace({ placeName: defaultPlace });
    }
  }, [place, setPlace, state?.places]);

  const handlePlaceChange = useCallback(
    (placeName: string) => {
      setPlace({ placeName: placeName });
    },
    [setPlace],
  );

  if (
    loading ||
    Object.keys(state?.devices ?? {}).length === 0 ||
    state?.places.length === 0
  )
    return <MainLoader />;
  return (
    <main className="grid content-baseline h-[100dvh]">
      <Places
        onChange={handlePlaceChange}
        items={state?.places ?? []}
        selected={place.placeName}
      />
      <Devices devices={state?.devices ?? {}} selectedPlace={place.placeName} />
    </main>
  );
}
