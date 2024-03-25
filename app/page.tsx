"use client";

import { Favorite, Settings } from "@mui/icons-material";
import { Avatar, Container, Paper } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { Places } from "./sections/Places/Places";

export default function Home() {
  const { user } = useCheckAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!user) router.replace("/login");
  //   }
  // }, [isLoading, router, user]);

  useEffect(() => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope,
        ),
      )
      .catch((err) =>
        console.error("Service Worker registration failed: ", err),
      );
  }, []);

  return (
    <Container
      component={"main"}
      maxWidth={false}
      disableGutters
      sx={{
        height: "100dvh",
        maxHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Places />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
          // position: "fixed",
          // bottom: 0,
          // left: 0,
          // right: 0,
        }}
        elevation={3}
      >
        <Link href="/favorites">
          <Favorite color="primary" />
        </Link>
        <Link href="/user">
          <Avatar
            alt={user?.name}
            src={user?.picture}
            sx={{ width: 32, height: 32 }}
          />
        </Link>
        <Link href="/settings">
          <Settings color="primary" />
        </Link>
      </Paper>
    </Container>
  );
}
