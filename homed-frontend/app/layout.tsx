import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { DeviceProvider } from "./context/deviceContext";
import "./globalicons.css";
import "./globals.css";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

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
    <html lang="pl" className={roboto.className}>
      <body className="relative p-0 m-0 grid text-base overflow-hidden bg-background text-onBackground">
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  );
}
