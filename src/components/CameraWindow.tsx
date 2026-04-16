import { useEffect, useRef, useState } from "react";

interface CameraWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

export function CameraWindow({ onClose, onMinimize }: CameraWindowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(true);

  useEffect(() => {
    let active = true;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((s) => {
        if (!active) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(() => setError("No se pudo acceder a la cámara"));
    return () => {
      active = false;
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setPhotos((prev) => [dataUrl, ...prev]);
  };

  return (
    <div
      className={`absolute flex flex-col bg-[#1a1a1a] shadow-2xl ${
        isMaximized ? "inset-0 bottom-10" : "left-20 top-20 h-[450px] w-[600px] rounded-lg"
      }`}
      style={{ zIndex: 40 }}
    >
      {/* Title bar */}
      <div className="flex h-9 items-center justify-between bg-[#2d2d2d] px-3">
        <span className="text-xs text-white/80">📷 Cámara</span>
        <div className="flex items-center gap-1">
          <button onClick={onMinimize} className="flex h-7 w-10 items-center justify-center text-xs text-white/60 hover:bg-white/10">─</button>
          <button onClick={() => setIsMaximized((m) => !m)} className="flex h-7 w-10 items-center justify-center text-xs text-white/60 hover:bg-white/10">{isMaximized ? "❐" : "□"}</button>
          <button onClick={onClose} className="flex h-7 w-10 items-center justify-center text-xs text-white/60 hover:bg-red-600">✕</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col items-center justify-center bg-black">
          {error ? (
            <div className="text-center text-white/60">
              <p className="text-4xl mb-2">📷</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs text-white/40 mt-1">Permite el acceso a la cámara en tu navegador</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-contain"
            />
          )}
          <canvas ref={canvasRef} className="hidden" />

          {/* Capture button */}
          {!error && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
              <button
                onClick={takePhoto}
                className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white/80 bg-white/20 transition-transform hover:scale-110 active:scale-95"
              >
                <div className="h-10 w-10 rounded-full bg-white" />
              </button>
            </div>
          )}
        </div>

        {/* Photo strip */}
        {photos.length > 0 && (
          <div className="flex w-20 flex-col gap-1 overflow-y-auto bg-[#1a1a1a] p-1">
            {photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`Foto ${i + 1}`}
                className="w-full rounded border border-white/10"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
