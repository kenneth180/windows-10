import { useEffect, useState } from "react";

interface TaskbarProps {
  onStartClick: () => void;
  startOpen: boolean;
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const d = time.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" });
  return (
    <div className="flex flex-col items-end text-[11px] leading-tight">
      <span>{t}</span>
      <span>{d}</span>
    </div>
  );
}

const pinnedApps = [
  { icon: "📁", name: "Explorador" },
  { icon: "🌐", name: "Edge" },
  { icon: "🛒", name: "Store" },
];

export function Taskbar({ onStartClick, startOpen }: TaskbarProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex h-10 items-center bg-[#1a1a2e]/95 backdrop-blur-md"
      style={{ zIndex: 50 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Start button */}
      <button
        onClick={onStartClick}
        className={`flex h-full w-12 items-center justify-center transition-colors hover:bg-white/10 ${startOpen ? "bg-white/10" : ""}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
          <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z" />
        </svg>
      </button>

      {/* Search */}
      <div className="ml-1 flex h-7 w-48 items-center rounded-sm bg-white/10 px-2">
        <svg viewBox="0 0 24 24" className="mr-2 h-3.5 w-3.5 fill-none stroke-white/60" strokeWidth={2}>
          <circle cx={11} cy={11} r={7} />
          <path d="m16 16 4 4" />
        </svg>
        <span className="text-[12px] text-white/50">Escribe aquí para buscar</span>
      </div>

      {/* Pinned apps */}
      <div className="ml-2 flex h-full items-center gap-0.5">
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
      <div className="flex h-full items-center gap-2 px-3 text-white/80">
        <span className="text-xs">^</span>
        <span className="text-sm">🔊</span>
        <span className="text-sm">📶</span>
        <Clock />
        <button className="flex h-full w-2 items-center justify-center hover:bg-white/10" />
      </div>
    </div>
  );
}
