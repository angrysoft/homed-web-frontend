import { Box, Button } from "@mui/material";

export default function Login() {
  return (
    <Box
      p={4}
      display={"flex"}
      justifyContent={"center"}
    >
      <Button href="/oauth2/authorization/google" variant="outlined">
        Login With Google
      </Button>
    </Box>
  );
}
