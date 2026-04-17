interface DesktopIconsProps {
  onOpenBrowser: () => void;
  onOpenCamera: () => void;
  onOpenNotepad: () => void;
  onOpenExplorer: () => void;
}

const icons = [
  { name: "Papelera de reciclaje", icon: "🗑️", action: "" },
  { name: "Este equipo", icon: "💻", action: "explorer" },
  { name: "Google Chrome", icon: "🟢", action: "browser" },
  { name: "Explorador de archivos", icon: "📁", action: "explorer" },
  { name: "Bloc de notas", icon: "📝", action: "notepad" },
  { name: "Cámara", icon: "📷", action: "camera" },
];

export function DesktopIcons({ onOpenBrowser, onOpenCamera, onOpenNotepad, onOpenExplorer }: DesktopIconsProps) {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1">
      {icons.map((item) => (
        <button
          key={item.name}
          className="flex w-20 flex-col items-center gap-1 rounded p-2 text-center hover:bg-white/10"
          onDoubleClick={() => {
            if (item.action === "browser") onOpenBrowser();
            if (item.action === "camera") onOpenCamera();
            if (item.action === "notepad") onOpenNotepad();
            if (item.action === "explorer") onOpenExplorer();
          }}
        >
          <span className="text-3xl drop-shadow-lg">{item.icon}</span>
          <span className="text-[11px] leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}
