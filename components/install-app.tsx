"use client";

import { useEffect, useState } from "react";

export default function InstallApp() {
  const [promptEvent, setPromptEvent] = useState<any>(null);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    setStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (event: any) => {
      event.preventDefault();
      setPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (standalone || !promptEvent) return null;

  async function install() {
    promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  }

  return (
    <button className="install-app" onClick={install}>
      INSTALL GEMS OF CARDS APP
    </button>
  );
}
