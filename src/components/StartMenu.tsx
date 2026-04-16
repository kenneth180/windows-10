const recentApps = [
  { icon: "🌐", name: "Microsoft Edge" },
  { icon: "📁", name: "Explorador de archivos" },
  { icon: "⚙️", name: "Configuración" },
  { icon: "📝", name: "Bloc de notas" },
  { icon: "🎨", name: "Paint" },
  { icon: "📧", name: "Correo" },
];

export function StartMenu() {
  return (
    <div
      className="absolute bottom-10 left-0 z-50 flex h-[500px] w-[600px] overflow-hidden rounded-t-lg bg-[#1a1a2e]/95 text-white shadow-2xl backdrop-blur-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left panel */}
      <div className="flex w-[280px] flex-col border-r border-white/10">
        <div className="p-4">
          <h2 className="mb-3 text-sm font-semibold tracking-wide">Ancladas</h2>
          <div className="grid grid-cols-3 gap-1">
            {recentApps.map((app) => (
              <button
                key={app.name}
                className="flex flex-col items-center gap-1 rounded-md p-3 hover:bg-white/10"
              >
                <span className="text-2xl">{app.icon}</span>
                <span className="text-[10px] leading-tight text-white/70">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-auto border-t border-white/10 p-3">
          <div className="flex items-center gap-3 rounded-md p-2 hover:bg-white/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
              U
            </div>
            <span className="text-sm">Usuario</span>
          </div>
          <button className="mt-1 flex w-full items-center gap-3 rounded-md p-2 text-sm hover:bg-white/10">
            <span>⏻</span>
            <span>Apagar</span>
          </button>
        </div>
      </div>

      {/* Right panel - Recommended */}
      <div className="flex-1 p-4">
        <h2 className="mb-3 text-sm font-semibold tracking-wide">Recomendadas</h2>
        <div className="space-y-1">
          {["Documento reciente.docx", "Presentación.pptx", "Foto_2026.jpg", "Notas.txt"].map(
            (file) => (
              <button
                key={file}
                className="flex w-full items-center gap-3 rounded-md p-2 text-left text-sm hover:bg-white/10"
              >
                <span className="text-lg">📄</span>
                <div>
                  <div className="text-white/90">{file}</div>
                  <div className="text-[10px] text-white/40">Hace 2 horas</div>
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
