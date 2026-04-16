import { useState, useRef } from "react";

interface BrowserWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

const quickLinks = [
  { name: "Google", url: "https://www.google.com/webhp?igu=1", icon: "🔍" },
  { name: "Replit", url: "https://replit.com", icon: "💻" },
  { name: "Base44", url: "https://base44.com", icon: "🔷" },
  { name: "Lovable", url: "https://lovable.dev", icon: "💜" },
  { name: "Eaglercraft", url: "https://eaglercraft.com", icon: "🎮" },
  { name: "MS Rewards", url: "https://rewards.microsoft.com", icon: "⭐" },
];

const bookmarks = [
  { name: "Google", url: "https://www.google.com/webhp?igu=1" },
  { name: "Replit", url: "https://replit.com" },
  { name: "Base44", url: "https://base44.com" },
  { name: "Lovable", url: "https://lovable.dev" },
  { name: "Eaglercraft", url: "https://eaglercraft.com" },
  { name: "MS Rewards", url: "https://rewards.microsoft.com" },
];

export function BrowserWindow({ onClose, onMinimize }: BrowserWindowProps) {
  const [url, setUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isMaximized, setIsMaximized] = useState(true);
  const [showHome, setShowHome] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (newUrl: string) => {
    let finalUrl = newUrl.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      if (finalUrl.includes(".") && !finalUrl.includes(" ")) {
        finalUrl = "https://" + finalUrl;
      } else {
        finalUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(finalUrl)}`;
      }
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
    setShowHome(false);
  };

  const goHome = () => {
    setShowHome(true);
    setUrl("");
    setInputUrl("");
  };

  return (
    <div
      className={`absolute flex flex-col bg-[#202124] shadow-2xl ${
        isMaximized ? "inset-0 bottom-10" : "left-10 top-10 h-[500px] w-[700px] rounded-lg"
      }`}
      style={{ zIndex: 40 }}
    >
      {/* Title bar */}
      <div className="flex h-9 items-center justify-between bg-[#1f1f1f] px-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-7 max-w-[200px] items-center gap-1.5 rounded-t-lg bg-[#2b2b2b] px-3 text-xs text-white/80">
            <span className="truncate">{showHome ? "New Tab" : "Browser"}</span>
          </div>
          <button className="text-xs text-white/40 hover:text-white/70">+</button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="flex h-7 w-10 items-center justify-center text-xs text-white/60 hover:bg-white/10"
          >
            ─
          </button>
          <button
            onClick={() => setIsMaximized((m) => !m)}
            className="flex h-7 w-10 items-center justify-center text-xs text-white/60 hover:bg-white/10"
          >
            {isMaximized ? "❐" : "□"}
          </button>
          <button
            onClick={onClose}
            className="flex h-7 w-10 items-center justify-center text-xs text-white/60 hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="flex h-10 items-center gap-2 bg-[#2b2b2b] px-3">
        <button
          onClick={() => iframeRef.current?.contentWindow?.history.back()}
          className="text-sm text-white/50 hover:text-white/80"
        >
          ◀
        </button>
        <button
          onClick={() => iframeRef.current?.contentWindow?.history.forward()}
          className="text-sm text-white/50 hover:text-white/80"
        >
          ▶
        </button>
        <button
          onClick={() => {
            if (showHome) return;
            if (iframeRef.current) iframeRef.current.src = url;
          }}
          className="text-sm text-white/50 hover:text-white/80"
        >
          ↻
        </button>
        <button
          onClick={goHome}
          className="text-sm text-white/50 hover:text-white/80"
        >
          🏠
        </button>
        <form
          className="flex flex-1 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(inputUrl);
          }}
        >
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="h-7 w-full rounded-full bg-[#3c3c3c] px-4 text-xs text-white/90 outline-none focus:bg-[#454545]"
            placeholder="Search or enter URL"
          />
        </form>
      </div>

      {/* Bookmarks bar */}
      <div className="flex h-7 items-center gap-3 bg-[#2b2b2b] border-t border-white/5 px-4 text-[11px] text-white/50">
        {bookmarks.map((bm) => (
          <button
            key={bm.name}
            onClick={() => navigate(bm.url)}
            className="hover:text-white/80"
          >
            {bm.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#202124] overflow-hidden">
        {showHome ? (
          <div className="flex h-full flex-col items-center justify-center gap-8 px-4">
            {/* Search bar */}
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-light text-white/90">Microsoft Edge</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(inputUrl);
                }}
                className="flex items-center"
              >
                <input
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="h-10 w-[400px] rounded-full bg-[#3c3c3c] px-5 text-sm text-white/90 outline-none focus:bg-[#454545] focus:ring-1 focus:ring-blue-500"
                  placeholder="Search the web"
                />
              </form>
            </div>

            {/* Quick links grid */}
            <div className="grid grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.url)}
                  className="flex flex-col items-center gap-2 rounded-xl p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
                    {link.icon}
                  </div>
                  <span className="text-xs text-white/70">{link.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={url}
            className="h-full w-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            title="Browser"
          />
        )}
      </div>
    </div>
  );
}
