"use client";

import { useContext } from "react";
import { useEvents } from "./hooks/useEvents";
import { useGetDevices } from "./hooks/useGetDevices";
import { AppContext } from "./store";
import MainLoader from "./components/MainLoader";
import { Places } from "./sections/Places";
import { Devices } from "./sections/devices/Devices";

export default function Home() {
  const { state } = useContext(AppContext);

  useEvents();
  useGetDevices();

  if (state.main.loading) {
    return <MainLoader />;
  }

  return (
    <main className="grid content-baseline h-[100dvh]">
      <Places />
      <Devices />
    </main>
  );
}
