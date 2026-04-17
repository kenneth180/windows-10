import wallpaper from "@/assets/wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { DesktopIcons } from "./DesktopIcons";
import { useState } from "react";
import { StartMenu } from "./StartMenu";
import { BrowserWindow } from "./BrowserWindow";
import { CameraWindow } from "./CameraWindow";
import { NotepadWindow } from "./NotepadWindow";
import { FileExplorerWindow } from "./FileExplorerWindow";
import { SettingsWindow } from "./SettingsWindow";

export function Desktop() {
  const [startOpen, setStartOpen] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [browserMinimized, setBrowserMinimized] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraMinimized, setCameraMinimized] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [notepadMinimized, setNotepadMinimized] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerMinimized, setExplorerMinimized] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsMinimized, setSettingsMinimized] = useState(false);

  const openBrowser = () => { setBrowserOpen(true); setBrowserMinimized(false); setStartOpen(false); };
  const openCamera = () => { setCameraOpen(true); setCameraMinimized(false); setStartOpen(false); };
  const openNotepad = () => { setNotepadOpen(true); setNotepadMinimized(false); setStartOpen(false); };
  const openExplorer = () => { setExplorerOpen(true); setExplorerMinimized(false); setStartOpen(false); };
  const openSettings = () => { setSettingsOpen(true); setSettingsMinimized(false); setStartOpen(false); };

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
      <DesktopIcons
        onOpenBrowser={openBrowser}
        onOpenCamera={openCamera}
        onOpenNotepad={openNotepad}
        onOpenExplorer={openExplorer}
      />
      {browserOpen && !browserMinimized && (
        <BrowserWindow onClose={() => setBrowserOpen(false)} onMinimize={() => setBrowserMinimized(true)} />
      )}
      {cameraOpen && !cameraMinimized && (
        <CameraWindow onClose={() => setCameraOpen(false)} onMinimize={() => setCameraMinimized(true)} />
      )}
      {notepadOpen && !notepadMinimized && (
        <NotepadWindow onClose={() => setNotepadOpen(false)} onMinimize={() => setNotepadMinimized(true)} />
      )}
      {explorerOpen && !explorerMinimized && (
        <FileExplorerWindow onClose={() => setExplorerOpen(false)} onMinimize={() => setExplorerMinimized(true)} />
      )}
      {settingsOpen && !settingsMinimized && (
        <SettingsWindow onClose={() => setSettingsOpen(false)} onMinimize={() => setSettingsMinimized(true)} />
      )}
      {startOpen && (
        <StartMenu
          onOpenBrowser={openBrowser}
          onOpenCamera={openCamera}
          onOpenNotepad={openNotepad}
          onOpenExplorer={openExplorer}
          onOpenSettings={openSettings}
        />
      )}
      <Taskbar
        onStartClick={() => setStartOpen((o) => !o)}
        startOpen={startOpen}
        browserOpen={browserOpen}
        browserMinimized={browserMinimized}
        onBrowserClick={() => {
          if (browserOpen && !browserMinimized) setBrowserMinimized(true);
          else if (browserOpen && browserMinimized) setBrowserMinimized(false);
          else openBrowser();
        }}
        cameraOpen={cameraOpen}
        cameraMinimized={cameraMinimized}
        onCameraClick={() => {
          if (cameraOpen && !cameraMinimized) setCameraMinimized(true);
          else if (cameraOpen && cameraMinimized) setCameraMinimized(false);
          else openCamera();
        }}
        explorerOpen={explorerOpen}
        explorerMinimized={explorerMinimized}
        onExplorerClick={() => {
          if (explorerOpen && !explorerMinimized) setExplorerMinimized(true);
          else if (explorerOpen && explorerMinimized) setExplorerMinimized(false);
          else openExplorer();
        }}
        notepadOpen={notepadOpen}
        notepadMinimized={notepadMinimized}
        onNotepadClick={() => {
          if (notepadOpen && !notepadMinimized) setNotepadMinimized(true);
          else if (notepadOpen && notepadMinimized) setNotepadMinimized(false);
          else openNotepad();
        }}
        settingsOpen={settingsOpen}
        settingsMinimized={settingsMinimized}
        onSettingsClick={() => {
          if (settingsOpen && !settingsMinimized) setSettingsMinimized(true);
          else if (settingsOpen && settingsMinimized) setSettingsMinimized(false);
          else openSettings();
        }}
      />
    </div>
  );
}
