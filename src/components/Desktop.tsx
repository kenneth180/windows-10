import wallpaper from "@/assets/wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { DesktopIcons } from "./DesktopIcons";
import { useState } from "react";
import { StartMenu } from "./StartMenu";
import { BrowserWindow } from "./BrowserWindow";

export function Desktop() {
  const [startOpen, setStartOpen] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [browserMinimized, setBrowserMinimized] = useState(false);

  const openBrowser = () => {
    setBrowserOpen(true);
    setBrowserMinimized(false);
  };

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
      <DesktopIcons onOpenBrowser={openBrowser} />
      {browserOpen && !browserMinimized && (
        <BrowserWindow
          onClose={() => setBrowserOpen(false)}
          onMinimize={() => setBrowserMinimized(true)}
        />
      )}
      {startOpen && <StartMenu onOpenBrowser={openBrowser} />}
      <Taskbar
        onStartClick={() => setStartOpen((o) => !o)}
        startOpen={startOpen}
        browserOpen={browserOpen}
        browserMinimized={browserMinimized}
        onBrowserClick={() => {
          if (browserOpen && !browserMinimized) {
            setBrowserMinimized(true);
          } else if (browserOpen && browserMinimized) {
            setBrowserMinimized(false);
          } else {
            openBrowser();
          }
        }}
      />
    </div>
  );
}
