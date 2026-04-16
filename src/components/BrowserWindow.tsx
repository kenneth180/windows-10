import { useState, useRef } from "react";

interface BrowserWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function BrowserWindow({ onClose, onMinimize }: BrowserWindowProps) {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");
  const [inputUrl, setInputUrl] = useState("https://www.google.com");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMaximized, setIsMaximized] = useState(true);

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
            <span className="truncate">New Tab</span>
            <button
              onClick={onClose}
              className="ml-1 rounded-sm p-0.5 hover:bg-white/10"
            >
              ✕
            </button>
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
            if (iframeRef.current) iframeRef.current.src = url;
          }}
          className="text-sm text-white/50 hover:text-white/80"
        >
          ↻
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
      <div className="flex h-7 items-center gap-3 bg-[#2b2b2b] px-4 text-[11px] text-white/50">
        {[
          { name: "Google", url: "https://www.google.com/webhp?igu=1" },
          { name: "Bing", url: "https://www.bing.com" },
          { name: "Youtube", url: "https://www.youtube.com" },
        ].map((bm) => (
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
      <div className="flex-1 bg-white">
        <iframe
          ref={iframeRef}
          src={url}
          className="h-full w-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title="Browser"
        />
      </div>
    </div>
  );
}
