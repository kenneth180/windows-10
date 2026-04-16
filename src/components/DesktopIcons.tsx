const icons = [
  { name: "Papelera de reciclaje", icon: "🗑️" },
  { name: "Este equipo", icon: "💻" },
  { name: "Microsoft Edge", icon: "🌐" },
  { name: "Explorador de archivos", icon: "📁" },
  { name: "Bloc de notas", icon: "📝" },
];

export function DesktopIcons() {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1">
      {icons.map((item) => (
        <button
          key={item.name}
          className="flex w-20 flex-col items-center gap-1 rounded p-2 text-center hover:bg-white/10"
          onDoubleClick={() => {}}
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
