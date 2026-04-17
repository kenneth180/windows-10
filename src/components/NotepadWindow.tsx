import { useState } from "react";

interface NotepadWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function NotepadWindow({ onClose, onMinimize }: NotepadWindowProps) {
  const [text, setText] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [fileName, setFileName] = useState("Sin título");
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const handleSave = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(null);
  };

  const handleNew = () => {
    setText("");
    setFileName("Sin título");
    setShowMenu(null);
  };

  const handleOpen = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt,text/plain";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setText(await file.text());
        setFileName(file.name.replace(/\.txt$/, ""));
      }
    };
    input.click();
    setShowMenu(null);
  };

  return (
    <div
      className={`absolute flex flex-col bg-white shadow-2xl ${
        isMaximized ? "inset-0 bottom-10" : "left-20 top-16 h-[500px] w-[640px] rounded-lg overflow-hidden"
      }`}
      style={{ zIndex: 41 }}
    >
      {/* Title bar */}
      <div className="flex h-8 items-center justify-between bg-[#f3f3f3] border-b border-gray-200">
        <div className="flex items-center gap-2 px-3 text-xs text-gray-700">
          <span>📝</span>
          <span>{fileName} - Bloc de notas</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={onMinimize}
            className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-gray-200"
          >
            ─
          </button>
          <button
            onClick={() => setIsMaximized((m) => !m)}
            className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-gray-200"
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-red-600 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu bar */}
      <div className="relative flex h-7 items-center border-b border-gray-200 bg-white px-1 text-xs text-gray-800">
        {["Archivo", "Editar", "Formato", "Ver", "Ayuda"].map((m) => (
          <button
            key={m}
            onClick={() => setShowMenu((c) => (c === m ? null : m))}
            className={`px-3 py-1 hover:bg-gray-100 ${showMenu === m ? "bg-gray-100" : ""}`}
          >
            {m}
          </button>
        ))}
        {showMenu === "Archivo" && (
          <div className="absolute left-0 top-7 z-10 w-48 border border-gray-200 bg-white py-1 shadow-lg">
            <button onClick={handleNew} className="block w-full px-4 py-1.5 text-left hover:bg-blue-100">Nuevo</button>
            <button onClick={handleOpen} className="block w-full px-4 py-1.5 text-left hover:bg-blue-100">Abrir...</button>
            <button onClick={handleSave} className="block w-full px-4 py-1.5 text-left hover:bg-blue-100">Guardar como...</button>
            <div className="my-1 border-t border-gray-200" />
            <button onClick={onClose} className="block w-full px-4 py-1.5 text-left hover:bg-blue-100">Salir</button>
          </div>
        )}
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 resize-none border-none p-3 font-mono text-sm text-gray-900 outline-none"
        placeholder="Empieza a escribir..."
        spellCheck={false}
        onClick={() => setShowMenu(null)}
      />

      {/* Status bar */}
      <div className="flex h-6 items-center justify-end gap-4 border-t border-gray-200 bg-[#f3f3f3] px-3 text-[11px] text-gray-600">
        <span>Líneas: {text.split("\n").length}</span>
        <span>Caracteres: {text.length}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
