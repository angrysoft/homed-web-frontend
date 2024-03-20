import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import theme from "./theme";
import { DeviceProvider } from "./context/deviceContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



export const metadata: Metadata = {
  title: "Homedaemon web",
  description: "Homedaemon web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="relative p-0 m-0 grid text-base overflow-hidden bg-background text-onBackground">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <DeviceProvider>{children}</DeviceProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
