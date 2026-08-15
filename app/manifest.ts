import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gems of Cards",
    short_name: "Gems of Cards",
    description: "A private digital vault for a premium trading card collection.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f12",
    theme_color: "#b89a62",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
