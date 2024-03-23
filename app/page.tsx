"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { Places } from "./sections/Places/Places";

export default function Home() {
  const { isLoading, user } = useCheckAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.replace("/login");
    }
  }, [isLoading, router, user]);

  return (
    <Container
      component={"main"}
      maxWidth={false}
      disableGutters
      sx={{
        height: "100dvh",
      }}
    >
      <Places />
    </Container>
  );
}
