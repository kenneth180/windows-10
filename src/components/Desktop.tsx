import wallpaper from "@/assets/wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { DesktopIcons } from "./DesktopIcons";
import { useState } from "react";
import { StartMenu } from "./StartMenu";

export function Desktop() {
  const [startOpen, setStartOpen] = useState(false);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden select-none"
      onClick={() => startOpen && setStartOpen(false)}
    >
      <img
        src={wallpaper}
        alt="Desktop wallpaper"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <DesktopIcons />
      {startOpen && <StartMenu />}
      <Taskbar onStartClick={() => setStartOpen((o) => !o)} startOpen={startOpen} />
    </div>
  );
}
