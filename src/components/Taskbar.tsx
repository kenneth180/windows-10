import { useEffect, useState } from "react";

interface TaskbarProps {
  onStartClick: () => void;
  startOpen: boolean;
  browserOpen: boolean;
  browserMinimized: boolean;
  onBrowserClick: () => void;
  cameraOpen: boolean;
  cameraMinimized: boolean;
  onCameraClick: () => void;
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = time.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="flex flex-col items-end text-[11px] leading-tight">
      <span>{hours}</span>
      <span>{date}</span>
    </div>
  );
}

function BatteryIcon() {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setLevel(Math.round(battery.level * 100));
        setCharging(battery.charging);
        battery.addEventListener("levelchange", () => setLevel(Math.round(battery.level * 100)));
        battery.addEventListener("chargingchange", () => setCharging(battery.charging));
      });
    }
  }, []);

  if (level === null) return <span className="text-xs">🔋</span>;

  return (
    <div className="flex items-center gap-0.5 text-[10px]" title={`${level}%${charging ? " (cargando)" : ""}`}>
      <div className="relative flex h-3 w-5 items-center rounded-sm border border-white/50">
        <div
          className={`h-1.5 rounded-sm ml-px ${level > 20 ? "bg-green-400" : "bg-red-400"}`}
          style={{ width: `${(level / 100) * 14}px` }}
        />
        <div className="absolute -right-1 top-1/2 h-1.5 w-0.5 -translate-y-1/2 rounded-r bg-white/50" />
      </div>
      {charging && <span>⚡</span>}
    </div>
  );
}

function VolumeIcon() {
  const [volume, setVolume] = useState(80);
  const [showSlider, setShowSlider] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowSlider((s) => !s)}
        onContextMenu={(e) => {
          e.preventDefault();
          setMuted((m) => !m);
        }}
        className="text-sm hover:text-white"
        title={muted ? "Silenciado" : `Volumen: ${volume}%`}
      >
        {muted ? "🔇" : volume > 50 ? "🔊" : volume > 0 ? "🔉" : "🔈"}
      </button>
      {showSlider && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-lg bg-[#2d2d30] p-3 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            className="h-24 w-1 appearance-none [writing-mode:vertical-lr] direction-rtl"
            style={{ accentColor: "#4a9eff" }}
          />
          <div className="mt-1 text-center text-[10px] text-white/60">{muted ? 0 : volume}</div>
        </div>
      )}
    </div>
  );
}

const pinnedApps = [
  { icon: "📁", name: "Explorador", action: "" },
  { icon: "🛒", name: "Store", action: "" },
];

export function Taskbar({
  onStartClick,
  startOpen,
  browserOpen,
  browserMinimized,
  onBrowserClick,
  cameraOpen,
  cameraMinimized,
  onCameraClick,
}: TaskbarProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex h-10 items-center bg-[#1a1a2e]/95 backdrop-blur-md"
      style={{ zIndex: 50 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onStartClick}
        className={`flex h-full w-12 items-center justify-center transition-colors hover:bg-white/10 ${startOpen ? "bg-white/10" : ""}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
          <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z" />
        </svg>
      </button>

      <div className="ml-1 flex h-7 w-48 items-center rounded-sm bg-white/10 px-2">
        <svg viewBox="0 0 24 24" className="mr-2 h-3.5 w-3.5 fill-none stroke-white/60" strokeWidth={2}>
          <circle cx={11} cy={11} r={7} />
          <path d="m16 16 4 4" />
        </svg>
        <span className="text-[12px] text-white/50">Escribe aquí para buscar</span>
      </div>

      <div className="ml-2 flex h-full items-center gap-0.5">
        <button
          onClick={onBrowserClick}
          className={`flex h-full w-10 items-center justify-center text-lg hover:bg-white/10 ${
            browserOpen ? "border-b-2 border-blue-400 bg-white/5" : ""
          }`}
          title="Microsoft Edge"
        >
          🌐
        </button>
        <button
          onClick={onCameraClick}
          className={`flex h-full w-10 items-center justify-center text-lg hover:bg-white/10 ${
            cameraOpen ? "border-b-2 border-blue-400 bg-white/5" : ""
          }`}
          title="Cámara"
        >
          📷
        </button>
        {pinnedApps.map((app) => (
          <button
            key={app.name}
            className="flex h-full w-10 items-center justify-center text-lg hover:bg-white/10"
            title={app.name}
          >
            {app.icon}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* System tray */}
      <div className="flex h-full items-center gap-2.5 px-3 text-white/80">
        <span className="cursor-pointer text-xs hover:text-white">^</span>
        <span className="text-sm">📶</span>
        <VolumeIcon />
        <BatteryIcon />
        <Clock />
        <button className="flex h-full w-2 items-center justify-center hover:bg-white/10" />
      </div>
    </div>
  );
}
