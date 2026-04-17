import { useState } from "react";

interface SettingsWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

const categories = [
  { id: "system", name: "Sistema", icon: "💻", desc: "Pantalla, sonido, notificaciones, energía" },
  { id: "devices", name: "Dispositivos", icon: "🖱️", desc: "Bluetooth, impresoras, ratón" },
  { id: "network", name: "Red e Internet", icon: "🌐", desc: "Wi-Fi, modo avión, VPN" },
  { id: "personal", name: "Personalización", icon: "🎨", desc: "Fondo, pantalla bloqueo, colores" },
  { id: "apps", name: "Aplicaciones", icon: "📦", desc: "Desinstalar, valores predeterminados" },
  { id: "accounts", name: "Cuentas", icon: "👤", desc: "Tus cuentas, correo, sincronizar" },
  { id: "time", name: "Hora e idioma", icon: "🕐", desc: "Voz, región, fecha" },
  { id: "gaming", name: "Juegos", icon: "🎮", desc: "Barra de juego, capturas, modo juego" },
  { id: "privacy", name: "Privacidad", icon: "🔒", desc: "Ubicación, cámara, micrófono" },
  { id: "update", name: "Actualización y seguridad", icon: "🔄", desc: "Windows Update, recuperación" },
];

export function SettingsWindow({ onClose, onMinimize }: SettingsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [accent, setAccent] = useState("#0078d4");
  const [notifications, setNotifications] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [wifi, setWifi] = useState(true);

  const selectedCat = categories.find((c) => c.id === selected);

  return (
    <div
      className={`absolute flex flex-col bg-[#f3f3f3] shadow-2xl ${
        isMaximized ? "inset-0 bottom-10" : "left-28 top-14 h-[560px] w-[820px] rounded-lg overflow-hidden"
      }`}
      style={{ zIndex: 43 }}
    >
      {/* Title bar */}
      <div className="flex h-8 items-center justify-between border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-3 text-xs text-gray-700">
          <span>⚙️</span>
          <span>Configuración</span>
        </div>
        <div className="flex items-center">
          <button onClick={onMinimize} className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-gray-200">─</button>
          <button onClick={() => setIsMaximized((m) => !m)} className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-gray-200">{isMaximized ? "❐" : "□"}</button>
          <button onClick={onClose} className="flex h-8 w-11 items-center justify-center text-xs text-gray-700 hover:bg-red-600 hover:text-white">✕</button>
        </div>
      </div>

      {selected ? (
        <div className="flex flex-1 overflow-hidden">
          <div className="w-60 overflow-y-auto border-r border-gray-200 bg-white py-2">
            <button onClick={() => setSelected(null)} className="mb-2 px-4 py-1 text-xs text-blue-600 hover:underline">
              ← Inicio
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-xs hover:bg-gray-100 ${selected === c.id ? "border-l-4 border-blue-500 bg-gray-100" : ""}`}
              >
                <span>{c.icon}</span>
                <span className="text-gray-800">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-8">
            <h1 className="mb-6 text-2xl font-semibold text-gray-900">{selectedCat?.name}</h1>

            {selected === "system" && (
              <div className="space-y-5 text-sm text-gray-800">
                <div>
                  <h3 className="mb-2 font-semibold">Pantalla</h3>
                  <div className="rounded bg-white p-4 shadow-sm">
                    <div className="mb-2 text-xs text-gray-600">Resolución</div>
                    <select className="w-64 rounded border border-gray-300 px-2 py-1 text-xs">
                      <option>1920 × 1080 (Recomendada)</option>
                      <option>1680 × 1050</option>
                      <option>1280 × 720</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Notificaciones</h3>
                  <label className="flex items-center justify-between rounded bg-white p-4 shadow-sm">
                    <span className="text-xs">Recibir notificaciones de aplicaciones</span>
                    <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="h-4 w-4" />
                  </label>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Acerca de</h3>
                  <div className="rounded bg-white p-4 text-xs shadow-sm">
                    <div>Edición: <strong>Windows 10 Pro</strong></div>
                    <div>Versión: <strong>22H2</strong></div>
                    <div>Procesador: <strong>Intel Core i7-12700K</strong></div>
                    <div>RAM instalada: <strong>16 GB</strong></div>
                  </div>
                </div>
              </div>
            )}

            {selected === "personal" && (
              <div className="space-y-5 text-sm text-gray-800">
                <div>
                  <h3 className="mb-2 font-semibold">Modo de color</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setDarkMode(false)} className={`rounded border-2 px-4 py-2 text-xs ${!darkMode ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}>Claro</button>
                    <button onClick={() => setDarkMode(true)} className={`rounded border-2 px-4 py-2 text-xs ${darkMode ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}>Oscuro</button>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Color de acento</h3>
                  <div className="flex flex-wrap gap-2">
                    {["#0078d4", "#e74c3c", "#27ae60", "#f39c12", "#9b59b6", "#1abc9c"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setAccent(c)}
                        style={{ backgroundColor: c }}
                        className={`h-8 w-8 rounded ${accent === c ? "ring-2 ring-offset-2 ring-gray-700" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selected === "network" && (
              <div className="space-y-3 text-sm">
                <label className="flex items-center justify-between rounded bg-white p-4 shadow-sm">
                  <div>
                    <div className="font-semibold">Wi-Fi</div>
                    <div className="text-xs text-gray-600">{wifi ? "Conectado a MiRed_5G" : "Desactivado"}</div>
                  </div>
                  <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} className="h-5 w-5" />
                </label>
                <label className="flex items-center justify-between rounded bg-white p-4 shadow-sm">
                  <div>
                    <div className="font-semibold">Modo avión</div>
                    <div className="text-xs text-gray-600">Detiene toda la comunicación inalámbrica</div>
                  </div>
                  <input type="checkbox" className="h-5 w-5" />
                </label>
              </div>
            )}

            {selected === "devices" && (
              <div className="space-y-3 text-sm">
                <label className="flex items-center justify-between rounded bg-white p-4 shadow-sm">
                  <div>
                    <div className="font-semibold">Bluetooth</div>
                    <div className="text-xs text-gray-600">{bluetooth ? "Activado" : "Desactivado"}</div>
                  </div>
                  <input type="checkbox" checked={bluetooth} onChange={(e) => setBluetooth(e.target.checked)} className="h-5 w-5" />
                </label>
                <div className="rounded bg-white p-4 text-xs shadow-sm">
                  <div className="font-semibold mb-2">Dispositivos conectados</div>
                  <div className="space-y-1 text-gray-700">
                    <div>🖱️ Mouse USB</div>
                    <div>⌨️ Teclado HP</div>
                    <div>🖨️ HP DeskJet 3700</div>
                  </div>
                </div>
              </div>
            )}

            {!["system", "personal", "network", "devices"].includes(selected) && (
              <div className="rounded bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                Configuración de <strong>{selectedCat?.name}</strong> próximamente.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">U</div>
            <div>
              <div className="text-lg font-semibold text-gray-900">Usuario</div>
              <div className="text-xs text-gray-600">Cuenta local</div>
            </div>
          </div>
          <div className="mb-6">
            <input className="h-9 w-full rounded border border-gray-300 px-3 text-xs outline-none focus:border-blue-500" placeholder="Buscar una opción de configuración" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className="flex flex-col items-center gap-2 rounded-lg bg-white p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                <span className="text-[11px] text-gray-600">{c.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
