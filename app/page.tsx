"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MainLoader from "./components/MainLoader";
import { DeviceContext } from "./context/deviceContext";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { Places } from "./sections/Places/Places";

export default function Home() {
  const [loading, user] = useCheckAuth();
  const state = useContext(DeviceContext);
 
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
    }
  }, [loading, router, user]);

  // useEffect(() => {
  //   if (place.placeName.length === 0) {
  //     const defaultPlace = state?.places.at(0);
  //     if (defaultPlace && defaultPlace.length !== 0)
  //       setPlace({ placeName: defaultPlace });
  //   }
  // }, [place, setPlace, state?.places]);

  

  if (loading || Object.keys(state?.devices ?? {}).length === 0)
    return <MainLoader />;

  return (
    <Container
      component={"main"}
      maxWidth={false}
      disableGutters
      sx={{
        height: "100dvh",
        width: "100%",
      }}
    >
      <Places />
    </Container>
  );
}
