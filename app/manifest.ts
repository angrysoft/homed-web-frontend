import { MetadataRoute } from "next";

interface MyManifest extends MetadataRoute.Manifest {
  screenshots?: {
    src: string;
    type?: string;
    sizes?: string;
    form_factor: string;
  }[];
}

export default function manifest(): MyManifest {
  return {
    name: "HomeDaemon Web app",
    description: "HomeDaemon web application",
    short_name: "HomedWeb",
    start_url: "/",
    lang: "pl-PL",
    theme_color: "#121212",
    background_color: "#121212",
    display: "standalone",
    scope: "/",
    icons: [
      {
        src: "/icons/homedaemon_logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/homedaemon_logo.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/icons/maskable_icon.png",
        sizes: "340x340",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot/screenshot1.png",
        sizes: "412x914",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
