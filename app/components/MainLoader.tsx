import React from "react";
import { CircularProgress, Box } from "@mui/material";

const MainLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={"8rem"}/>
    </Box>
  );
};

export default MainLoader;
