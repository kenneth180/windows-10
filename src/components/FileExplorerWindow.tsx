import { useState } from "react";

interface FileExplorerWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
  icon: string;
}

const folderContents: Record<string, FileItem[]> = {
  "Este equipo": [
    { name: "Escritorio", type: "folder", modified: "15/04/2026 19:30", icon: "🖥️" },
    { name: "Documentos", type: "folder", modified: "14/04/2026 10:15", icon: "📄" },
    { name: "Descargas", type: "folder", modified: "15/04/2026 20:01", icon: "⬇️" },
    { name: "Imágenes", type: "folder", modified: "12/04/2026 08:45", icon: "🖼️" },
    { name: "Música", type: "folder", modified: "10/04/2026 14:22", icon: "🎵" },
    { name: "Vídeos", type: "folder", modified: "08/04/2026 19:50", icon: "🎬" },
    { name: "Disco local (C:)", type: "folder", modified: "15/04/2026 19:30", icon: "💽" },
  ],
  Documentos: [
    { name: "Trabajo", type: "folder", modified: "14/04/2026 09:00", icon: "📁" },
    { name: "Proyecto.docx", type: "file", size: "24 KB", modified: "13/04/2026 16:42", icon: "📘" },
    { name: "Notas.txt", type: "file", size: "2 KB", modified: "12/04/2026 11:20", icon: "📄" },
    { name: "Presupuesto.xlsx", type: "file", size: "18 KB", modified: "10/04/2026 14:55", icon: "📗" },
  ],
  Descargas: [
    { name: "instalador.exe", type: "file", size: "45 MB", modified: "15/04/2026 19:55", icon: "⚙️" },
    { name: "foto_vacaciones.jpg", type: "file", size: "3.2 MB", modified: "15/04/2026 12:10", icon: "🖼️" },
    { name: "manual.pdf", type: "file", size: "1.1 MB", modified: "14/04/2026 17:30", icon: "📕" },
  ],
  Imágenes: [
    { name: "Capturas de pantalla", type: "folder", modified: "13/04/2026 22:00", icon: "📁" },
    { name: "wallpaper.jpg", type: "file", size: "2.8 MB", modified: "12/04/2026 08:45", icon: "🖼️" },
    { name: "perfil.png", type: "file", size: "512 KB", modified: "11/04/2026 19:00", icon: "🖼️" },
  ],
  Escritorio: [
    { name: "Acceso directo - Edge", type: "file", size: "1 KB", modified: "15/04/2026 19:00", icon: "🌐" },
    { name: "TODO.txt", type: "file", size: "1 KB", modified: "15/04/2026 18:30", icon: "📄" },
  ],
};

const sidebarItems = [
  { name: "Acceso rápido", icon: "⭐", header: true },
  { name: "Escritorio", icon: "🖥️" },
  { name: "Descargas", icon: "⬇️" },
  { name: "Documentos", icon: "📄" },
  { name: "Imágenes", icon: "🖼️" },
  { name: "Este equipo", icon: "💻", header: true },
  { name: "Música", icon: "🎵" },
  { name: "Vídeos", icon: "🎬" },
];

export function FileExplorerWindow({ onClose, onMinimize }: FileExplorerWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>(["Este equipo"]);

  const current = currentPath[currentPath.length - 1];
  const items = folderContents[current] || [];

  const navigate = (folder: string) => {
    setCurrentPath((p) => [...p, folder]);
  };

  const goBack = () => {
    if (currentPath.length > 1) setCurrentPath((p) => p.slice(0, -1));
  };

  const goTo = (folder: string) => {
    setCurrentPath([folder]);
  };

  return (
    <div
      className={`absolute flex flex-col bg-white shadow-2xl ${
        isMaximized ? "inset-0 bottom-10" : "left-24 top-12 h-[520px] w-[780px] rounded-lg overflow-hidden"
      }`}
      style={{ zIndex: 42 }}
    >
      {/* Title bar */}
      <div className="flex h-8 items-center justify-between border-b border-gray-200 bg-[#f3f3f3]">
        <div className="flex items-center gap-2 px-3 text-xs text-gray-700">
          <span>📁</span>
          <span>{current}</span>
        </div>
        <div className="flex items-center">
          <button onClick={onMinimize} className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-gray-200">─</button>
          <button onClick={() => setIsMaximized((m) => !m)} className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-gray-200">{isMaximized ? "❐" : "□"}</button>
          <button onClick={onClose} className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-red-600 hover:text-white">✕</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex h-9 items-center gap-1 border-b border-gray-200 bg-white px-2 text-xs text-gray-700">
        <button onClick={goBack} disabled={currentPath.length <= 1} className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30">←</button>
        <button disabled className="px-2 py-1 opacity-30">→</button>
        <button onClick={() => currentPath.length > 1 && setCurrentPath((p) => p.slice(0, -1))} className="px-2 py-1 hover:bg-gray-100">↑</button>
        <div className="mx-2 flex h-6 flex-1 items-center rounded border border-gray-300 bg-white px-2 text-[11px]">
          <span className="mr-1">📁</span>
          {currentPath.map((p, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-1 text-gray-400">›</span>}
              <span>{p}</span>
            </span>
          ))}
        </div>
        <input className="h-6 w-44 rounded border border-gray-300 px-2 text-[11px] outline-none focus:border-blue-500" placeholder={`Buscar en ${current}`} />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 overflow-y-auto border-r border-gray-200 bg-[#f9f9f9] py-2 text-xs">
          {sidebarItems.map((item) =>
            item.header ? (
              <div key={item.name} className="mt-2 flex items-center gap-2 px-3 py-1 font-semibold text-gray-700">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            ) : (
              <button
                key={item.name}
                onClick={() => goTo(item.name)}
                className={`flex w-full items-center gap-2 px-6 py-1 text-left hover:bg-blue-50 ${current === item.name ? "bg-blue-100" : ""}`}
              >
                <span>{item.icon}</span>
                <span className="text-gray-800">{item.name}</span>
              </button>
            ),
          )}
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr] border-b border-gray-200 bg-[#f3f3f3] px-3 py-1.5 text-[11px] font-semibold text-gray-700">
            <span>Nombre</span>
            <span>Fecha de modificación</span>
            <span>Tipo</span>
            <span>Tamaño</span>
          </div>
          {items.length === 0 && (
            <div className="p-8 text-center text-xs text-gray-500">Esta carpeta está vacía.</div>
          )}
          {items.map((item) => (
            <button
              key={item.name}
              onDoubleClick={() => item.type === "folder" && navigate(item.name)}
              className="grid w-full grid-cols-[2fr,1fr,1fr,1fr] items-center px-3 py-1 text-left text-xs hover:bg-blue-50"
            >
              <span className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-gray-900">{item.name}</span>
              </span>
              <span className="text-gray-600">{item.modified}</span>
              <span className="text-gray-600">{item.type === "folder" ? "Carpeta" : "Archivo"}</span>
              <span className="text-gray-600">{item.size || ""}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex h-6 items-center border-t border-gray-200 bg-[#f3f3f3] px-3 text-[11px] text-gray-600">
        {items.length} elementos
      </div>
    </div>
  );
}
